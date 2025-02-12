from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        # Get MongoDB connection string from environment variables
        mongodb_uri = os.getenv('MONGODB_URI')
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
        return self.users.insert_one(user_data)

    def get_user(self, email):
        return self.users.find_one({"email": email}) 