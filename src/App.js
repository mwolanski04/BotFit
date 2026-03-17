import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import MealPlan from './MealPlan';

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <Navbar />
        <Routes>
          {/* Default to Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path='/MealPlan' element={<MealPlan />} />
          
          {/* Profile/Dashboard route */}
          <Route path="/profile" element={
            <div style={styles.hero}>
              <h1>Welcome Back, Athlete</h1>
              <p>Your stats are looking sharp today.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: { backgroundColor: '#121212', minHeight: '100vh', color: '#fff', fontFamily: 'Arial' },
  hero: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }
};

export default App;
