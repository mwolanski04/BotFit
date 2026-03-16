import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    navigate('/profile');
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={{ marginBottom: '1.5rem', color: '#00ff88' }}>Member Login</h2>
        <input type="email" placeholder="Email" style={styles.input} required />
        <input type="password" placeholder="Password" style={styles.input} required />
        <button type="submit" style={styles.button}>Start Training</button>
      </form>
    </div>
  );
};

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' },
  card: { background: '#1e1e1e', padding: '2rem', borderRadius: '8px', width: '350px', textAlign: 'center', border: '1px solid #333' },
  input: { width: '100%', padding: '12px', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #444', background: '#121212', color: '#fff' },
  button: { width: '100%', padding: '12px', border: 'none', borderRadius: '4px', background: '#00ff88', color: '#000', fontWeight: 'bold', cursor: 'pointer' }
};

export default Login;