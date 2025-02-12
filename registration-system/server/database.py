from pymongo import MongoClient
import os
from dotenv import load_dotenv
import bcrypt
import jwt
from datetime import datetime, timedelta

load_dotenv()

class Database:
    def __init__(self):
        # Get MongoDB connection string from environment variables
        mongodb_uri = os.getenv('MONGODB_URI')
        self.jwt_secret = os.getenv('JWT_SECRET', 'your-secret-key')  # Add this to .env
        try:
            self.client = MongoClient(mongodb_uri)
            # Test the connection
            self.client.admin.command('ping')
            print("Successfully connected to MongoDB!")
            self.db = self.client['elysian_db']
            self.users = self.db['users']
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            raise

    def add_user(self, user_data):
        # Hash the password before storing
        password = user_data['password'].encode('utf-8')
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)
        # Store both salt and hash
        user_data['password'] = {
            'hash': hashed.decode('utf-8'),
            'salt': salt.decode('utf-8')
        }
        return self.users.insert_one(user_data)

    def get_user(self, email):
        return self.users.find_one({"email": email})

    def verify_password(self, plain_password, stored_password):
        try:
            # Get stored hash and salt
            stored_hash = stored_password['hash'].encode('utf-8')
            stored_salt = stored_password['salt'].encode('utf-8')
            
            # Hash the provided password with the stored salt
            password = plain_password.encode('utf-8')
            hashed = bcrypt.hashpw(password, stored_salt)
            
            return hashed == stored_hash
        except Exception as e:
            print(f"Password verification error: {e}")
            return False

    def generate_token(self, user_id, email):
        payload = {
            'user_id': str(user_id),
            'email': email,
            'exp': datetime.utcnow() + timedelta(days=1)  # Token expires in 1 day
        }
        return jwt.encode(payload, self.jwt_secret, algorithm='HS256')

    def verify_token(self, token):
        try:
            payload = jwt.decode(token, self.jwt_secret, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None 