from flask import Flask, request, jsonify
from database import Database
import requests
import os
from dotenv import load_dotenv
from functools import wraps

load_dotenv()

app = Flask(__name__)
db = Database()

# Message service URL (Node.js server)
MESSAGE_SERVICE_URL = os.getenv('MESSAGE_SERVICE_URL', 'http://localhost:3000')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        token = token.split(' ')[1] if len(token.split(' ')) > 1 else token
        user_data = db.verify_token(token)
        
        if not user_data:
            return jsonify({'error': 'Token is invalid or expired'}), 401

        return f(*args, **kwargs)
    return decorated

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    
    # Basic validation
    if not all(k in data for k in ["email", "password", "name"]):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if user already exists
    if db.get_user(data['email']):
        return jsonify({"error": "User already exists"}), 409

    # Add user to database
    result = db.add_user(data)
    token = db.generate_token(result.inserted_id, data['email'])

    # Request welcome message from message service
    try:
        response = requests.post(f"{MESSAGE_SERVICE_URL}/generate-message", 
                               json={"name": data['name']})
        welcome_message = response.json().get('message')
    except requests.RequestException:
        welcome_message = "Welcome to our service!"

    return jsonify({
        "message": "Registration successful",
        "welcome_message": welcome_message,
        "token": token
    }), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    # Basic validation
    if not all(k in data for k in ["email", "password"]):
        return jsonify({"error": "Missing email or password"}), 400

    # Get user from database
    user = db.get_user(data['email'])
    
    # Check if user exists and password matches
    if not user or not db.verify_password(data['password'], user['password']):
        return jsonify({"error": "Invalid email or password"}), 401

    token = db.generate_token(user['_id'], user['email'])

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "email": user['email'],
            "name": user['name']
        }
    }), 200

# Example of protected route
@app.route('/protected', methods=['GET'])
@token_required
def protected():
    return jsonify({"message": "This is a protected route"}), 200

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)