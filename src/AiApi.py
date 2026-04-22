import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai

load_dotenv() 

app = Flask(__name__)
CORS(app)

# Gets rid of spaces just in case the .env has any whitespace
api_key = os.environ.get("GEMINI_API_KEY", "").strip()
client = genai.Client(api_key=api_key) if api_key else None

@app.route('/mealplan', methods=['POST'])
def mealplan():
    user_data = request.json
    try:
        meal_plan = get_plans(user_data)
        return jsonify({'text': meal_plan}), 200
    except Exception as e:
        # Catching the exception ensures that the server returns a clean JSON error
        return jsonify({'error': str(e)}), 500

def get_plans(user_data):
    # Now user_data contains both profile info and their question
    prompt_text = (
        f"My current weight is {user_data.get('currentWeight')} lbs, "
        f"my goal weight is {user_data.get('goalWeight')} lbs, "
        f"my height is {user_data.get('height')} inches, "
        f"my age is {user_data.get('age')}, and my gender is {user_data.get('gender')}. "
        f"I also have this specific request: {user_data.get('query')}\n\n"
        "Please make me a meal plan and provide advice tailored to my profile and request."
    )
    
    if not client:
        raise Exception("Gemini AI API key not configured on server")

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt_text
    )
    
    return response.text

def prompt():
    while True:
        user_input = input("How can I help you today? ")
        
        if not user_input.strip():
            break
            
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=user_input
        )
        print(response.text)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)