from flask import Flask, request, jsonify
from database import Database
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
db = Database()

# Message service URL (Node.js server)
MESSAGE_SERVICE_URL = os.getenv('MESSAGE_SERVICE_URL', 'http://localhost:3000')

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
    db.add_user(data)

    # Request welcome message from message service
    try:
        response = requests.post(f"{MESSAGE_SERVICE_URL}/generate-message", 
                               json={"name": data['name']})
        welcome_message = response.json().get('message')
    except requests.RequestException:
        welcome_message = "Welcome to our service!"

    return jsonify({
        "message": "Registration successful",
        "welcome_message": welcome_message
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
    if not user or user['password'] != data['password']:
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "email": user['email'],
            "name": user['name']
        }
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)