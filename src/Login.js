import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/profile');
      } else if (response.status === 404) {
        navigate('/Register');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={{ marginBottom: '1.5rem', color: '#00ff88' }}>Member Login</h2>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Logging in' : 'Start Training'}
        </button>
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