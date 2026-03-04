# test_path.py
import os
from app import create_app

print("=" * 50)
print("Database Path Debug")
print("=" * 50)

# Check current directory
current_dir = os.getcwd()
print(f"Current directory: {current_dir}")

# Check if database folder exists
db_folder = os.path.join(current_dir, 'database')
if os.path.exists(db_folder):
    print(f"✅ Database folder exists: {db_folder}")
else:
    print(f"❌ Database folder missing: {db_folder}")

# Check if database file exists
db_file = os.path.join(db_folder, 'users.db')
if os.path.exists(db_file):
    print(f"✅ Database file exists: {db_file}")
    print(f"   File size: {os.path.getsize(db_file)} bytes")
else:
    print(f"❌ Database file missing: {db_file}")

# Check what SQLAlchemy is using
print("\n" + "=" * 50)
print("SQLAlchemy Configuration")
print("=" * 50)

app = create_app()
with app.app_context():
    db_uri = app.config['SQLALCHEMY_DATABASE_URI']
    print(f"Database URI: {db_uri}")
    
    # Extract path from URI
    if db_uri.startswith('sqlite:///'):
        db_path = db_uri.replace('sqlite:///', '')
        print(f"Extracted path: {db_path}")
        
        if os.path.exists(db_path):
            print(f"✅ SQLAlchemy path exists")
        else:
            print(f"❌ SQLAlchemy path does NOT exist")
            print(f"   This is the problem!")

print("\n" + "=" * 50)