# backend/email_service.py
from flask import current_app
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging

logger = logging.getLogger(__name__)

class EmailService:
    """Email service for sending emails"""
    
    @staticmethod
    def check_email_configuration():
        """Check if email is configured"""
        username = current_app.config.get('MAIL_USERNAME', '')
        password = current_app.config.get('MAIL_PASSWORD', '')
        
        return {
            'configured': bool(username and password),
            'server': current_app.config.get('MAIL_SERVER'),
            'port': current_app.config.get('MAIL_PORT'),
            'development_mode': current_app.config.get('DEVELOPMENT_MODE', True)
        }
    
    @staticmethod
    def send_password_reset_email(recipient_email, reset_link, user_name=None):
        """Send password reset email"""
        try:
            smtp_server = current_app.config.get('MAIL_SERVER')
            smtp_port = current_app.config.get('MAIL_PORT')
            username = current_app.config.get('MAIL_USERNAME')
            password = current_app.config.get('MAIL_PASSWORD')
            sender = current_app.config.get('MAIL_DEFAULT_SENDER')
            use_tls = current_app.config.get('MAIL_USE_TLS', True)
            
            if not username or not password:
                logger.warning("Email not configured")
                return False
            
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = 'Password Reset Request - CareerConnect'
            msg['From'] = sender
            msg['To'] = recipient_email
            
            # Plain text version
            text = f"""
            Hello {user_name or 'User'},
            
            You requested to reset your password for CareerConnect.
            
            Please click the link below to reset your password:
            {reset_link}
            
            This link will expire in 15 minutes.
            
            If you didn't request this, please ignore this email.
            
            Best regards,
            CareerConnect Team
            """
            
            # HTML version
            html = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; }}
                    .button {{
                        display: inline-block;
                        padding: 12px 24px;
                        background-color: #4F46E5;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                    }}
                </style>
            </head>
            <body>
                <h2>Password Reset Request</h2>
                <p>Hello {user_name or 'User'},</p>
                <p>Click the button below to reset your password:</p>
                <a href="{reset_link}" class="button">Reset Password</a>
                <p>Link: {reset_link}</p>
                <p>This link expires in 15 minutes.</p>
            </body>
            </html>
            """
            
            msg.attach(MIMEText(text, 'plain'))
            msg.attach(MIMEText(html, 'html'))
            
            # Send email
            if use_tls:
                server = smtplib.SMTP(smtp_server, smtp_port)
                server.starttls()
            else:
                server = smtplib.SMTP_SSL(smtp_server, smtp_port)
            
            server.login(username, password)
            server.send_message(msg)
            server.quit()
            
            logger.info(f"Email sent to {recipient_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False