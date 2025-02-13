import pytest
from app import app, db
import json
from bson import ObjectId

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture(autouse=True)
def cleanup():
    # Clean up before each test
    db.users.delete_many({})
    yield
    # Clean up after each test
    db.users.delete_many({})

def test_signup_success(client):
    """Test successful user registration"""
    test_user = {
        "email": "test@example.com",
        "password": "Test123!",
        "name": "Test User"
    }
    
    response = client.post('/register', 
                          data=json.dumps(test_user),
                          content_type='application/json')
    
    assert response.status_code == 201
    data = json.loads(response.data)
    assert "token" in data
    assert "welcome_message" in data
    assert data["message"] == "Registration successful"

def test_signup_duplicate_email(client):
    """Test registration with existing email"""
    test_user = {
        "email": "test@example.com",
        "password": "Test123!",
        "name": "Test User"
    }
    
    # First registration
    client.post('/register', 
                data=json.dumps(test_user),
                content_type='application/json')
    
    # Attempt duplicate registration
    response = client.post('/register', 
                          data=json.dumps(test_user),
                          content_type='application/json')
    
    assert response.status_code == 409
    data = json.loads(response.data)
    assert "error" in data
    assert "already exists" in data["error"]

def test_login_success(client):
    """Test successful login"""
    # First create a user
    test_user = {
        "email": "login@example.com",
        "password": "Test123!",
        "name": "Test User"
    }
    
    client.post('/register', 
                data=json.dumps(test_user),
                content_type='application/json')
    
    # Now try to login
    login_data = {
        "email": "login@example.com",
        "password": "Test123!"
    }
    
    response = client.post('/login',
                          data=json.dumps(login_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "token" in data
    assert "user" in data

def test_login_invalid_credentials(client):
    """Test login with wrong password"""
    # First create a user
    test_user = {
        "email": "wrong@example.com",
        "password": "Test123!",
        "name": "Test User"
    }
    
    client.post('/register', 
                data=json.dumps(test_user),
                content_type='application/json')
    
    # Try to login with wrong password
    login_data = {
        "email": "wrong@example.com",
        "password": "WrongPassword123!"
    }
    
    response = client.post('/login',
                          data=json.dumps(login_data),
                          content_type='application/json')
    
    assert response.status_code == 401
    data = json.loads(response.data)
    assert "error" in data 