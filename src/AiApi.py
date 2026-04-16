import os
from dotenv import load_dotenv
from google import genai

load_dotenv() 

api_key = os.environ.get("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

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

def get_plans(user_data):
    prompt_text = (
        f"My current weight is {user_data.get('currentWeight')} lbs, "
        f"my goal weight is {user_data.get('goalWeight')} lbs, "
        f"my height is {user_data.get('height')} inches, "
        f"my age is {user_data.get('age')}, and my gender is {user_data.get('gender')}. "
        "Please make me a meal plan for breakfast, lunch, and dinner, and link the recipes for each meal."
        "Please make me a workout plan and link the exercises for each workout."

    )
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt_text
    )
    
    print(response.text)
    return response.text

if __name__ == '__main__':
    prompt()