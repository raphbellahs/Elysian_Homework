from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, User, Session
import bcrypt

app = Flask(__name__)
CORS(app)

# Initialize the database
init_db()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not all(key in data for key in ['username', 'email', 'password']):
        return jsonify({'message': 'Missing required fields'}), 400
    
    session = Session()
    try:
        # Check if user already exists
        if session.query(User).filter_by(email=data['email']).first():
            return jsonify({'message': 'Email already registered'}), 400
        
        if session.query(User).filter_by(username=data['username']).first():
            return jsonify({'message': 'Username already taken'}), 400
        
        # Hash the password
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        
        # Create new user
        new_user = User(
            username=data['username'],
            email=data['email'],
            password=hashed_password.decode('utf-8')
        )
        
        session.add(new_user)
        session.commit()
        
        return jsonify({'message': 'User registered successfully'}), 201
    
    except Exception as e:
        session.rollback()
        return jsonify({'message': str(e)}), 500
    
    finally:
        session.close()

if __name__ == '__main__':
    app.run(debug=True) 