# backend/auth.py
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import (
    create_access_token, create_refresh_token, 
    jwt_required, get_jwt_identity
)
from models import db, User, PasswordResetToken
from email_service import EmailService
from datetime import datetime, timedelta
import re
import logging

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
logger = logging.getLogger(__name__)

# ==================== HELPER FUNCTIONS ====================

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_password(password):
    """Validate password strength"""
    issues = []
    suggestions = []
    
    if len(password) < 6:
        issues.append("Password must be at least 6 characters long")
        suggestions.append("Add more characters")
    
    if not re.search(r'[A-Z]', password):
        suggestions.append("Add uppercase letter for stronger password")
    
    if not re.search(r'[a-z]', password):
        suggestions.append("Add lowercase letter")
    
    if not re.search(r'[0-9]', password):
        suggestions.append("Add number for stronger password")
    
    is_valid = len(issues) == 0
    
    return {
        'valid': is_valid,
        'issues': issues,
        'suggestions': suggestions[:2]
    }

def validate_name(name):
    """Validate name"""
    if len(name) < 2:
        return False, "Name must be at least 2 characters long"
    if len(name) > 100:
        return False, "Name must be less than 100 characters"
    return True, "Valid name"

# ==================== AUTHENTICATION ENDPOINTS ====================

@auth_bp.route('/register', methods=['POST'])
def register():
    """User registration endpoint"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not name or not email or not password:
            return jsonify({
                'success': False,
                'message': 'All fields are required'
            }), 400
        
        is_valid_name, name_message = validate_name(name)
        if not is_valid_name:
            return jsonify({
                'success': False,
                'message': name_message
            }), 400
        
        if not validate_email(email):
            return jsonify({
                'success': False,
                'message': 'Invalid email format'
            }), 400
        
        password_validation = validate_password(password)
        
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({
                'success': False,
                'message': 'Email already registered'
            }), 409
        
        # Create user
        user = User(
            name=name,
            email=email,
            profile_completion=20
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        # Create tokens
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        
        logger.info(f"New user registered: {email}")
        
        return jsonify({
            'success': True,
            'message': 'Registration successful',
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Registration error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred during registration. Please try again.'
        }), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({
                'success': False,
                'message': 'Email and password are required'
            }), 400
        
        user = User.query.filter_by(email=email).first()
        
        if not user or not user.check_password(password):
            return jsonify({
                'success': False,
                'message': 'Invalid email or password'
            }), 401
        
        if not user.is_active:
            return jsonify({
                'success': False,
                'message': 'Account is deactivated. Please contact support.'
            }), 403
        
        user.last_seen = datetime.utcnow()
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        
        logger.info(f"User logged in: {email}")
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred during login. Please try again.'
        }), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or not user.is_active:
            return jsonify({
                'success': False,
                'message': 'User not found or inactive'
            }), 401
        
        new_access_token = create_access_token(identity=str(current_user_id))
        
        return jsonify({
            'success': True,
            'access_token': new_access_token
        }), 200
        
    except Exception as e:
        logger.error(f"Token refresh error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred while refreshing token'
        }), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """User logout endpoint"""
    try:
        return jsonify({
            'success': True,
            'message': 'Logout successful'
        }), 200
    except Exception as e:
        logger.error(f"Logout error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred during logout'
        }), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current authenticated user"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or not user.is_active:
            return jsonify({
                'success': False,
                'message': 'User not found or inactive'
            }), 404
        
        return jsonify({
            'success': True,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        logger.error(f"Get user error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred while fetching user data'
        }), 500

# ==================== PASSWORD RESET ENDPOINTS ====================

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    """Forgot password endpoint"""
    try:
        data = request.get_json()
        
        if not data or 'email' not in data:
            return jsonify({
                'success': False,
                'message': 'Email is required'
            }), 400
        
        email = data['email'].strip().lower()
        
        if not validate_email(email):
            return jsonify({
                'success': False,
                'message': 'Invalid email format'
            }), 400
        
        user = User.query.filter_by(email=email).first()
        
        # Always return success for security
        if not user:
            logger.info(f"Password reset requested for non-existent email: {email}")
            
            if current_app.config.get('DEVELOPMENT_MODE', True):
                fake_token = PasswordResetToken.generate_token()
                reset_link = f"{current_app.config['FRONTEND_URL']}/reset-password?token={fake_token}"
                
                return jsonify({
                    'success': True,
                    'message': 'If an account exists with this email, you will receive password reset instructions.',
                    'development_mode': True,
                    'reset_token': fake_token,
                    'reset_link': reset_link,
                    'expires_in': '15 minutes'
                }), 200
            else:
                return jsonify({
                    'success': True,
                    'message': 'If an account exists with this email, you will receive password reset instructions.'
                }), 200
        
        # Invalidate old tokens
        PasswordResetToken.query.filter_by(
            user_id=user.id, 
            used=False
        ).update({'used': True})
        db.session.commit()
        
        # Create new token
        token = PasswordResetToken.generate_token()
        expires_at = datetime.utcnow() + timedelta(minutes=15)
        
        reset_token = PasswordResetToken(
            user_id=user.id,
            token=token,
            expires_at=expires_at
        )
        
        db.session.add(reset_token)
        db.session.commit()
        
        reset_link = f"{current_app.config['FRONTEND_URL']}/reset-password?token={token}"
        
        # Try to send email
        email_config = EmailService.check_email_configuration()
        email_sent = False
        
        if email_config['configured']:
            email_sent = EmailService.send_password_reset_email(
                recipient_email=user.email,
                reset_link=reset_link,
                user_name=user.name
            )
        
        if email_sent:
            logger.info(f"Password reset email sent to {email}")
            return jsonify({
                'success': True,
                'message': 'Password reset instructions have been sent to your email. Please check your inbox and spam folder.'
            }), 200
        else:
            logger.warning(f"Email not sent to {email} - using development mode")
            
            return jsonify({
                'success': True,
                'message': 'Password reset instructions sent to your email',
                'development_mode': True,
                'reset_token': token,
                'reset_link': reset_link,
                'expires_in': '15 minutes',
                'email_configured': False,
                'debug_info': {
                    'email': user.email,
                    'name': user.name,
                    'token_created': datetime.utcnow().isoformat(),
                    'token_expires': expires_at.isoformat()
                }
            }), 200
        
    except Exception as e:
        logger.error(f"Forgot password error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred. Please try again later.'
        }), 500

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    """Reset password endpoint"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data provided'
            }), 400
        
        token = data.get('token', '').strip()
        new_password = data.get('new_password', '')
        
        if not token or not new_password:
            return jsonify({
                'success': False,
                'message': 'Token and new password are required'
            }), 400
        
        password_validation = validate_password(new_password)
        if not password_validation['valid']:
            return jsonify({
                'success': False,
                'message': password_validation['issues'][0] if password_validation['issues'] else 'Invalid password'
            }), 400
        
        # Find valid token
        reset_token = PasswordResetToken.query.filter_by(
            token=token,
            used=False
        ).first()
        
        if not reset_token or not reset_token.is_valid():
            return jsonify({
                'success': False,
                'message': 'Invalid or expired reset token. Please request a new password reset.'
            }), 400
        
        user = reset_token.user
        
        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        user.set_password(new_password)
        reset_token.used = True
        
        PasswordResetToken.query.filter_by(
            user_id=user.id,
            used=False
        ).update({'used': True})
        
        db.session.commit()
        
        logger.info(f"Password reset successful for user: {user.email}")
        
        return jsonify({
            'success': True,
            'message': 'Password has been reset successfully. You can now login with your new password.'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Reset password error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred. Please try again later.'
        }), 500

@auth_bp.route('/verify-reset-token', methods=['POST'])
def verify_reset_token():
    """Verify if a reset token is valid"""
    try:
        data = request.get_json()
        
        if not data or 'token' not in data:
            return jsonify({
                'success': False,
                'message': 'Token is required'
            }), 400
        
        token = data['token'].strip()
        
        reset_token = PasswordResetToken.query.filter_by(
            token=token,
            used=False
        ).first()
        
        if not reset_token or not reset_token.is_valid():
            return jsonify({
                'success': False,
                'message': 'Invalid or expired token'
            }), 400
        
        return jsonify({
            'success': True,
            'message': 'Token is valid',
            'email': reset_token.user.email
        }), 200
        
    except Exception as e:
        logger.error(f"Verify token error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred'
        }), 500

# ==================== EMAIL CONFIGURATION ENDPOINTS ====================

@auth_bp.route('/email-config', methods=['GET'])
def get_email_config():
    """Check email configuration status"""
    try:
        config = EmailService.check_email_configuration()
        
        return jsonify({
            'success': True,
            'credentials_configured': config.get('configured', False),
            'server': config.get('server'),
            'port': config.get('port'),
            'development_mode': config.get('development_mode', True),
            'message': 'Email configuration status retrieved'
        }), 200
        
    except Exception as e:
        logger.error(f"Email config error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Could not check email configuration',
            'credentials_configured': False,
            'development_mode': True
        }), 200

@auth_bp.route('/test-email', methods=['POST'])
def test_email():
    """Test email configuration"""
    try:
        if not current_app.config.get('DEVELOPMENT_MODE', True):
            return jsonify({
                'success': False,
                'message': 'Test endpoint only available in development mode'
            }), 403
        
        data = request.get_json()
        email = data.get('email', '').strip()
        
        if not email or not validate_email(email):
            return jsonify({
                'success': False,
                'message': 'Valid email required'
            }), 400
        
        test_token = PasswordResetToken.generate_token()
        reset_link = f"{current_app.config['FRONTEND_URL']}/reset-password?token={test_token}"
        
        email_sent = EmailService.send_password_reset_email(
            recipient_email=email,
            reset_link=reset_link,
            user_name='Test User'
        )
        
        if email_sent:
            return jsonify({
                'success': True,
                'message': f'Test email sent to {email}',
                'token': test_token,
                'reset_link': reset_link
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to send test email. Check email configuration.',
                'development_mode': True,
                'token': test_token,
                'reset_link': reset_link
            }), 200
        
    except Exception as e:
        logger.error(f"Test email error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Error sending test email'
        }), 500