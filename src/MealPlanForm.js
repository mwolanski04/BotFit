import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MealPlanForm = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);

    const getAIResponse = async () => {
        setLoading(true);
        setResponseText('');
        try {
            // 1. First, fetch the logged-in user's profile from port 5000 (Database container)
            const profileResponse = await fetch('http://localhost:5000/profile', {
                credentials: 'include'
            });

            const profileData = await profileResponse.json();

            // 2. Put the retrieved profile data and the user's text box entry
            const payload = {
                ...profileData,
                input: input
            };

            // 3. Send this to port 5001 this is where the AiApi.py is located and handles the AI
            const aiResponse = await fetch('http://localhost:5001/mealplan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const aiData = await aiResponse.json();
            if (aiResponse.ok) {
                setResponseText(aiData.text);
            } else {
                setResponseText(aiData.error || 'Error Please make sure you are logged in.');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseText('Error contacting server. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#fff' }}>
            <h2>Meal Plan Form</h2>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: '80%', height: '100px', marginBottom: '1rem', padding: '10px' }}
            />
            <br />
            <button
                onClick={getAIResponse}
                disabled={loading}
                style={{
                    padding: '10px 20px', cursor: 'pointer', background: '#00ff88', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold'
                }}
            >
                Generate Meal Plan
            </button>

            <button
                onClick={() => navigate('/MealPlan')}
                style={{
                    padding: '10px 20px', cursor: 'pointer', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', marginLeft: '10px'
                }}
            >
                Back to Meal Plan
            </button>

            <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap', textAlign: 'left', background: '#121212', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
                {responseText ? <p dangerouslySetInnerHTML={{ __html: responseText.replace(/\n/g, '<br>') }} style={{ margin: 0 }} /> : <p>Your meal plan will appear here.</p>}
            </div>
        </div>
    );
}

export default MealPlanForm;