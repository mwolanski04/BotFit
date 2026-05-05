import unittest
from unittest.mock import patch, MagicMock
from AiApi import app

class TestAiApi(unittest.TestCase):
    def setUp(self):
        # Set up the Flask test client
        self.app = app.test_client()

    @patch('AiApi.client')
    def test_mealplan(self, mock_client):
        # Acts as the AI response for the test
        mock_response = MagicMock()
        mock_response.text = "Mocked meal plan response"
        mock_client.models.generate_content.return_value = mock_response

        # Sends a basic request
        response = self.app.post('/mealplan', json={
            "currentWeight": 150, "goalWeight": 140, "height": 68, 
            "age": 25, "gender": "male", "input": "vegetarian"
        })
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'text': 'Mocked meal plan response'})

    @patch('AiApi.client')
    # Acts as the AI response for the test
    def test_workoutplan(self, mock_client):
        mock_response = MagicMock()
        mock_response.text = "Mocked workout plan response"
        mock_client.models.generate_content.return_value = mock_response

        response = self.app.post('/workoutplan', json={
            "currentWeight": 150, "goalWeight": 140, "height": 68, 
            "age": 25, "gender": "male", "reason": "muscle", "details": "3 days"
        })
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'text': 'Mocked workout plan response'})

    def test_missing_data(self):
        response = self.app.post('/mealplan', json=None)
        
        # Verify it catches the error and returns a 500 status code
        self.assertEqual(response.status_code, 500)
        self.assertIn('error', response.json)

if __name__ == '__main__':
    unittest.main()
