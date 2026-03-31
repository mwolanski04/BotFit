import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        currentWeight: '',
        goalWeight: '',
        height: '',
        age: '',
        gender: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/profile');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Could not connect to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <form style={styles.card} onSubmit={handleRegister}>
                <h2 style={{ marginBottom: '1.5rem', color: '#00ff88' }}>Create Account</h2>

                <div style={styles.row}>
                    <input name="firstName" placeholder="First Name" style={styles.input} value={form.firstName} onChange={handleChange} required />
                    <input name="lastName" placeholder="Last Name" style={styles.input} value={form.lastName} onChange={handleChange} required />
                </div>

                <input name="email" type="email" placeholder="Email" style={styles.inputFull} value={form.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" style={styles.inputFull} value={form.password} onChange={handleChange} required />

                <div style={styles.row}>
                    <input name="currentWeight" type="number" placeholder="Current Weight (lbs)" style={styles.input} value={form.currentWeight} onChange={handleChange} required />
                    <input name="goalWeight" type="number" placeholder="Goal Weight (lbs)" style={styles.input} value={form.goalWeight} onChange={handleChange} required />
                </div>

                <div style={styles.row}>
                    <input name="height" type="number" placeholder="Height (inches)" style={styles.input} value={form.height} onChange={handleChange} required />
                    <input name="age" type="number" placeholder="Age" style={styles.input} value={form.age} onChange={handleChange} required />
                </div>

                <select name="gender" style={styles.inputFull} value={form.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                {error && <p style={styles.error}>{error}</p>}

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Creating Account' : 'Start Your Journey'}
                </button>

                <p style={styles.link}>
                    Already have an account?{' '}
                    <span style={styles.linkText} onClick={() => navigate('/login')}>Sign in</span>
                </p>
            </form>
        </div>
    );
};

const styles = {
    wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem 0' },
    card: { background: '#1e1e1e', padding: '2rem', borderRadius: '8px', width: '400px', textAlign: 'center', border: '1px solid #333' },
    row: { display: 'flex', gap: '0.5rem', marginBottom: '0' },
    input: { flex: 1, padding: '12px', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #444', background: '#121212', color: '#fff' },
    inputFull: { width: '100%', padding: '12px', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #444', background: '#121212', color: '#fff', boxSizing: 'border-box' },
    button: { width: '100%', padding: '12px', border: 'none', borderRadius: '4px', background: '#00ff88', color: '#000', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' },
    error: { color: '#ff4444', marginBottom: '1rem', fontSize: '0.9rem' },
    link: { color: '#888', fontSize: '0.9rem', marginTop: '1rem' },
    linkText: { color: '#00ff88', cursor: 'pointer' }
};

export default Register;