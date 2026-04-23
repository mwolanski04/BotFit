import React, { useState } from 'react';

const WorkoutPlanForm = () => {
    const [reason, setReason] = useState('Unable to access equipment');
    const [details, setDetails] = useState('');
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseText('');

        try {
            // Gets the user's profile info from the database (Port 5000)
            const profileResponse = await fetch('http://localhost:5000/profile', {
                credentials: 'include'
            });
            const profileData = await profileResponse.json();

            // Combines their profile data with their workout plan requests
            const payload = {
                ...profileData,
                reason: reason,
                details: details
            };

            // Sends all of this to the AI API to get the response
            const aiResponse = await fetch('http://localhost:5001/workoutplan', {
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
                setResponseText(aiData.error || 'Error: Please make sure you are logged in.');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseText('Error contacting server. Please try again.');
        }

        setLoading(false);
    }

    return (
        <div style={styles.wrapper}>
            <h2>Workout Plan Form</h2>

            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label}>Reason for wanting to update your workout plan:</label>
                <select style={styles.input} value={reason} onChange={(e) => setReason(e.target.value)}>
                    <option value="Unable to access equipment">Unable to access equipment</option>
                    <option value="Injury or health reasons">Injury or health reasons</option>
                    <option value="Not enjoyable">Not enjoyable</option>
                    <option value="Too difficult">Too difficult</option>
                    <option value="Other">Other</option>
                </select>
                <label style={styles.label}>Is there anything we should account for in future workouts?</label>
                <textarea
                    style={styles.input}
                    placeholder="Additional details (optional)"
                    rows="4"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
                <button style={styles.input} disabled={loading} type="submit">
                    {loading ? 'Generating...' : 'Change Workout Plan'}
                </button>
            </form>

            <br />
            {responseText && (
                <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                    <h3 style={{ color: '#00ff88' }}>Generated Workout Plan:</h3>
                    <p dangerouslySetInnerHTML={{ __html: responseText.replace(/\n/g, '<br>') }} />
                </div>
            )}
        </div>
    )
}

const styles = {
    wrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px', margin: '2rem auto' },
    label: { fontSize: '1.2rem', color: '#00ff88' },
    input: { padding: '0.5rem', fontSize: '1rem' }
};

export default WorkoutPlanForm;