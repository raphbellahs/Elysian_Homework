import pytest
from app import app, db
import json
import os
import requests

# Get the API URL from environment variable, default to local if not set
API_URL = os.getenv('API_URL', 'http://localhost:5000')
USE_LIVE_SERVER = os.getenv('USE_LIVE_SERVER', 'false').lower() == 'true'

@pytest.fixture
def client():
    if USE_LIVE_SERVER:
        # Return a session object for live server testing
        return requests.Session()
    else:
        # Return Flask test client for local testing
        app.config['TESTING'] = True
        with app.test_client() as client:
            yield client

@pytest.fixture(autouse=True)
def cleanup():
    if not USE_LIVE_SERVER:  # Only clean local database
        db.users.delete_many({})
        yield
        db.users.delete_many({})
    else:
        yield

def make_request(client, method, endpoint, data=None):
    """Helper function to make requests to either local or live server"""
    headers = {"Content-Type": "application/json"}
    
    if USE_LIVE_SERVER:
        url = f"{API_URL}{endpoint}"
        if method == 'POST':
            response = client.post(url, json=data, headers=headers)
        else:
            response = client.get(url, headers=headers)
    else:
        if method == 'POST':
            response = client.post(endpoint, 
                                 data=json.dumps(data),
                                 content_type='application/json')
        else:
            response = client.get(endpoint)
    return response

def test_signup_success(client):
    """Test successful user registration"""
    test_user = {
        "email": "test@example.com",
        "password": "Test123!",
        "name": "Test User"
    }
    
    response = make_request(client, 'POST', '/register', test_user)
    
    assert response.status_code == 201
    data = response.json() if USE_LIVE_SERVER else json.loads(response.data)
    assert "token" in data
    assert "welcome_message" in data
    assert data["message"] == "Registration successful"

def test_signup_duplicate_email(client):
    """Test registration with existing email"""
    test_user = {
        "email": "test2@example.com",
        "password": "Test123!",
        "name": "Test User"
    }
    
    # First registration
    make_request(client, 'POST', '/register', test_user)
    
    # Attempt duplicate registration
    response = make_request(client, 'POST', '/register', test_user)
    
    assert response.status_code == 409
    data = response.json() if USE_LIVE_SERVER else json.loads(response.data)
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
    
    make_request(client, 'POST', '/register', test_user)
    
    # Now try to login
    login_data = {
        "email": "login@example.com",
        "password": "Test123!"
    }
    
    response = make_request(client, 'POST', '/login', login_data)
    
    assert response.status_code == 200
    data = response.json() if USE_LIVE_SERVER else json.loads(response.data)
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
    
    make_request(client, 'POST', '/register', test_user)
    
    # Try to login with wrong password
    login_data = {
        "email": "wrong@example.com",
        "password": "WrongPassword123!"
    }
    
    response = make_request(client, 'POST', '/login', login_data)
    
    assert response.status_code == 401
    data = response.json() if USE_LIVE_SERVER else json.loads(response.data)
    assert "error" in data 