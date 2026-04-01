from flask import Flask, request, jsonify, session
from flask_cors import CORS
import pyodbc
import bcrypt

app = Flask(__name__)
app.secret_key = 'SLU23'
CORS(app, supports_credentials=True)

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
    cursor.execute("SELECT password_hash FROM users WHERE email = ?", email)
    row = cursor.fetchone()

    if not row:
        return jsonify({'error': 'Email not found'}), 404
        
    if not bcrypt.checkpw(password.encode(), row[0].encode()):
        return jsonify({'error': 'Wrong password'}), 401

    session['user_id'] = email
    return jsonify({'message': 'Login successful'}), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    conn = get_db()
    cursor = conn.cursor()
    
    hashed = bcrypt.hashpw(data.get('password').encode(), bcrypt.gensalt()).decode()

    cursor.execute("""
        INSERT INTO users (firstName, lastName, email, password_hash, goalWeight, currentWeight, height, age, gender)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (data.get('firstName'), data.get('lastName'), data.get('email'), hashed, 
          data.get('goalWeight'), data.get('currentWeight'), data.get('height'), 
          data.get('age'), data.get('gender')))
    conn.commit()

    session['user_id'] = data.get('email')
    return jsonify({'message': 'Registration successful'}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)