from google import genai
import os

GOOGLE_API_KEY = "AIzaSyA8cgAJc0zKbTPRmh-yX1iNggpzMg6LYGo"

# Create the client using the new format
client = genai.Client(api_key=GOOGLE_API_KEY)

def prompt():
    user_input = input("How can I help you today? ")
    
    # You must declare which model you want to use
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=user_input
    )
    print(response.text)

if __name__ == '__main__':
    prompt()