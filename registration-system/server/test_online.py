from database import Database
import json

def test_online_db():
    try:
        # Initialize database connection
        db = Database()
        print("Connected to MongoDB Atlas!")

        # Test registration
        test_user = {
            "email": "test2@example.com",  # Changed email to avoid duplicate
            "password": "test123",
            "name": "Test User"
        }

        # Try to register
        print("\nTesting registration...")
        result = db.add_user(test_user)
        print(f"User registered with ID: {result.inserted_id}")

        # Generate token
        token = db.generate_token(result.inserted_id, test_user['email'])
        print(f"\nGenerated token: {token}")

        # Test login
        print("\nTesting login...")
        user = db.get_user(test_user['email'])
        if user and db.verify_password("test123", user['password']):
            print("Login successful!")
            print(f"User details: {json.dumps({'email': user['email'], 'name': user['name']}, indent=2)}")
        else:
            print("Login failed!")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_online_db() 