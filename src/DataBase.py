from flask import Flask, request, jsonify, session
from flask_cors import CORS
import pyodbc
import bcrypt
import os
from dotenv import load_dotenv
from google import genai

app = Flask(__name__)
app.secret_key = 'SLU23'
CORS(app, supports_credentials=True)

load_dotenv()
api_key = os.environ.get("GEMINI_API_KEY")
client = genai.Client(api_key=api_key) if api_key else None

def get_db():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 18 for SQL Server};'
        'SERVER=db,1433;'             
        'DATABASE=botFit;'      
        'UID=sa;'                     
        'PWD=SLUonTOP123;'
        'TrustServerCertificate=yes;'
    )
    return conn

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    conn = get_db()
    cursor = conn.cursor()
    # Fetch the stored password hash for the given email
    cursor.execute("SELECT password_hash FROM users WHERE email = ?", email)
    row = cursor.fetchone()

    if not row:
        return jsonify({'error': 'Email not found'}), 404
        
    # Verify the password against the stored hash
    if not bcrypt.checkpw(password.encode(), row[0].encode()):
        return jsonify({'error': 'Wrong password'}), 401

    # Store the user's email in the session to keep them logged in
    session['user_id'] = email
    return jsonify({'message': 'Login successful'}), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    
    # Hash the user's new password before saving it to the database
    hashed = bcrypt.hashpw(data.get('password').encode(), bcrypt.gensalt()).decode()

    cursor.execute("""
        INSERT INTO users (firstName, lastName, email, password_hash, goalWeight, currentWeight, height, age, gender)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (data.get('firstName'), data.get('lastName'), data.get('email'), hashed, 
          data.get('goalWeight'), data.get('currentWeight'), data.get('height'), 
          data.get('age'), data.get('gender')))
    conn.commit()

    # Automatically log the user in after successful registration
    session['user_id'] = data.get('email')
    return jsonify({'message': 'Registration successful'}), 201


@app.route('/profile', methods=['GET'])
def profile():
    # Retrieve the user ID from the active session
    email = session.get('user_id')
    if not email:
        return jsonify({'error': 'User not logged in'}), 401
    conn = get_db()
    cursor = conn.cursor()
    # Gets all profile data for the user
    cursor.execute("SELECT firstName, lastName, email, goalWeight, currentWeight, height, age, gender FROM users WHERE email =?", email)
    row = cursor.fetchone()
    if not row:
        return jsonify({"error": "User is not found"}), 404
    else:
        return jsonify({
            "firstName": row[0],
            "lastName": row[1],
            "email": row[2],
            "goalWeight": row[3],
            "currentWeight": row[4],
            "height": row[5],
            "age": row[6],
            "gender": row[7],
        }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)