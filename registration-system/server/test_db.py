from database import Database

def test_connection():
    try:
        db = Database()
        # Try to insert a test document
        result = db.add_user({
            "email": "test@example.com",
            "name": "Test User",
            "password": "test123"
        })
        print("Test user inserted with ID:", result.inserted_id)
        
        # Try to retrieve the user
        user = db.get_user("test@example.com")
        print("Retrieved user:", user)
        
        print("Database connection and operations successful!")
        
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_connection() 