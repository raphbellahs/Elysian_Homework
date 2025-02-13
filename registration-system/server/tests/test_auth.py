import pytest
from app import app
import json
from bson import ObjectId

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_signup_success(client):
    """Test successful user registration"""
    test_user = {
        "email": "test@example.com",
        "password": "Test123!",
        "firstName": "Test",
        "lastName": "User"
    }
    
    response = client.post('/api/auth/signup', 
                          data=json.dumps(test_user),
                          content_type='application/json')
    
    assert response.status_code == 201
    data = json.loads(response.data)
    assert "token" in data
    assert data["message"] == "User registered successfully"

def test_signup_duplicate_email(client):
    """Test registration with existing email"""
    test_user = {
        "email": "test@example.com",
        "password": "Test123!",
        "firstName": "Test",
        "lastName": "User"
    }
    
    # First registration
    client.post('/api/auth/signup', 
                data=json.dumps(test_user),
                content_type='application/json')
    
    # Attempt duplicate registration
    response = client.post('/api/auth/signup', 
                          data=json.dumps(test_user),
                          content_type='application/json')
    
    assert response.status_code == 400
    data = json.loads(response.data)
    assert "error" in data
    assert "already exists" in data["error"]

def test_login_success(client):
    """Test successful login"""
    # First create a user
    test_user = {
        "email": "login@example.com",
        "password": "Test123!",
        "firstName": "Test",
        "lastName": "User"
    }
    
    client.post('/api/auth/signup', 
                data=json.dumps(test_user),
                content_type='application/json')
    
    # Now try to login
    login_data = {
        "email": "login@example.com",
        "password": "Test123!"
    }
    
    response = client.post('/api/auth/login',
                          data=json.dumps(login_data),
                          content_type='application/json')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "token" in data

def test_login_invalid_credentials(client):
    """Test login with wrong password"""
    # First create a user
    test_user = {
        "email": "wrong@example.com",
        "password": "Test123!",
        "firstName": "Test",
        "lastName": "User"
    }
    
    client.post('/api/auth/signup', 
                data=json.dumps(test_user),
                content_type='application/json')
    
    # Try to login with wrong password
    login_data = {
        "email": "wrong@example.com",
        "password": "WrongPassword123!"
    }
    
    response = client.post('/api/auth/login',
                          data=json.dumps(login_data),
                          content_type='application/json')
    
    assert response.status_code == 401
    data = json.loads(response.data)
    assert "error" in data 