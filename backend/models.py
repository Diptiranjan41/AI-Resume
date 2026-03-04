# backend/models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import string

db = SQLAlchemy()

class User(db.Model):
    """User model for authentication"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    
    # Profile fields (optional)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    phone = db.Column(db.String(20))
    location = db.Column(db.String(100))
    bio = db.Column(db.Text)
    profile_photo = db.Column(db.String(200))
    resume = db.Column(db.String(200))
    
    # Education fields
    college = db.Column(db.String(100))
    degree = db.Column(db.String(100))
    graduation_year = db.Column(db.Integer)
    
    # Skills stored as JSON string
    skills = db.Column(db.Text, default='[]')
    
    # Status
    is_active = db.Column(db.Boolean, default=True)
    profile_completion = db.Column(db.Integer, default=0)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_seen = db.Column(db.DateTime)
    
    # Relationships
    password_reset_tokens = db.relationship('PasswordResetToken', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Set password hash - compatible with Werkzeug 2.2.3"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Check password against hash - compatible with Werkzeug 2.2.3"""
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        """Convert user to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'location': self.location,
            'bio': self.bio,
            'profile_photo': self.profile_photo,
            'resume': self.resume,
            'college': self.college,
            'degree': self.degree,
            'graduation_year': self.graduation_year,
            'skills': self.skills,
            'profile_completion': self.profile_completion,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'last_seen': self.last_seen.isoformat() if self.last_seen else None
        }

class PasswordResetToken(db.Model):
    """Password reset token model"""
    __tablename__ = 'password_reset_tokens'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    token = db.Column(db.String(200), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    used = db.Column(db.Boolean, default=False)
    
    @staticmethod
    def generate_token(length=64):
        """Generate a secure random token"""
        alphabet = string.ascii_letters + string.digits
        return ''.join(secrets.choice(alphabet) for _ in range(length))
    
    def is_valid(self):
        """Check if token is valid and not expired"""
        return not self.used and datetime.utcnow() < self.expires_at