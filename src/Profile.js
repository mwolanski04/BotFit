import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();

        navigate('/profile');
    };

    return (
        <div style={styles.wrapper}>
            <form style={styles.card} onSubmit={handleLogin}>
                <h2 style={{ marginBottom: '1.rem', color: '#35c481ff' }}>Welcome back John </h2>
                <h2 style={{ marginBottom: '1.5rem', color: '#00ff88' }}>Profile</h2>
                {/*This is the hard coded info*/}
                <p style={styles.input}>Current weight: 180</p>
                <p style={styles.input}>Goal weight: 160</p>
                <p style={styles.input}>Height: 5'11"</p>
                {/*This is formatting for the buttons*/}
                <button type="button" style={{ ...styles.button, marginTop: '1rem' }}>Meal plan</button>
                <button type="button" style={{ ...styles.button, marginTop: '1rem' }}>Edit Profile</button>
                <button type="button" style={{ ...styles.button, marginTop: '1rem' }}>Workout plan</button>
            </form>
            {/*This makes the second box for this info*/}
            <form style={styles.card} onSubmit={handleLogin}>
                <h2 style={{ marginBottom: '1.0rem', color: '#35c481ff' }}>Previous workout</h2>
                <p style={styles.input}>Will have them here</p>

            </form>

        </div>
    );
};

const styles = {
    wrapper: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' },
    card: { background: '#1e1e1e', padding: '2rem', borderRadius: '8px', width: '350px', textAlign: 'center', border: '1px solid #333' },
    input: { width: '100%', padding: '12px', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #444', background: '#121212', color: '#fff' },
    button: { width: '100%', padding: '12px', border: 'none', borderRadius: '4px', background: '#00ff88', color: '#000', fontWeight: 'bold', cursor: 'pointer' }
};




export default Profile;