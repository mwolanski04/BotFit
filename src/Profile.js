import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({ firstName: '', currentWeight: '', goalWeight: '', height: '' });

    useEffect(() => {
        fetch('http://localhost:5000/profile', { credentials: 'include' })
            .then(res => res.json())
            .then(profileData => setData(profileData));
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/profile');
    };

    return ( //Try and space these out more on the website they are too close together
        <div style={styles.wrapper}>
            <form style={styles.card} onSubmit={handleLogin}>
                <h2 style={{ marginBottom: '1.rem', color: '#35c481ff' }}>Welcome back {data.firstName} </h2>
                <h2 style={{ marginBottom: '1.5rem', color: '#00ff88' }}>Profile</h2>
                {/*This is the hard coded info*/}
                <p style={styles.input}>Current weight: {data.currentWeight}</p>
                <p style={styles.input}>Goal weight: {data.goalWeight}</p>
                <p style={styles.input}>Height: {Math.round((data.height / 12).toFixed(1))}ft</p>
                <p style={styles.input}>Age: {data.age}</p>

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