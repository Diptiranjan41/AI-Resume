# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from datetime import timedelta
import os
from dotenv import load_dotenv
import logging

load_dotenv()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
    
    # Database
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///career_navigator.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Frontend URL
    app.config['FRONTEND_URL'] = os.getenv('FRONTEND_URL', 'http://localhost:5173')
    app.config['DEVELOPMENT_MODE'] = True
    
    # Extensions
    CORS(app, resources={
        r"/api/*": {
            "origins": [app.config['FRONTEND_URL']],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })
    
    jwt = JWTManager(app)
    
    from models import db
    db.init_app(app)
    migrate = Migrate(app, db)
    
    # JWT Error Handlers
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({'success': False, 'message': 'Token expired'}), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({'success': False, 'message': 'Invalid token'}), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({'success': False, 'message': 'Missing token'}), 401
    
    # Blueprints
    from auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    # Health Check
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({'success': True, 'message': 'API is running'}), 200
    
    @app.route('/')
    def index():
        return jsonify({
            'name': 'Career Navigator API',
            'version': '1.0.0',
            'status': 'running',
            'endpoints': {
                'register': 'POST /api/auth/register',
                'login': 'POST /api/auth/login',
                'me': 'GET /api/auth/me',
                'refresh': 'POST /api/auth/refresh',
                'logout': 'POST /api/auth/logout',
                'forgot-password': 'POST /api/auth/forgot-password',
                'reset-password': 'POST /api/auth/reset-password',
                'health': 'GET /api/health'
            }
        })
    
    # Create tables and test user
    with app.app_context():
        db.create_all()
        logger.info("Database tables created")
        
        # Create test user
        from models import User
        if not User.query.filter_by(email='test@example.com').first():
            test_user = User(name='Test User', email='test@example.com')
            test_user.set_password('Test@123')
            db.session.add(test_user)
            db.session.commit()
            logger.info("Test user created: test@example.com / Test@123")
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)