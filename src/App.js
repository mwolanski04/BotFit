import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
<<<<<<< Updated upstream
import MealPlan from './MealPlan';
=======
import Profile from './Profile';
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <Navbar />
        <Routes>
          {/* Default to Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
<<<<<<< Updated upstream
          <Route path='/MealPlan' element={<MealPlan />} />
          
          {/* Profile/Dashboard route */}
          <Route path="/profile" element={
            <div style={styles.hero}>
              <h1>Welcome Back, Athlete</h1>
              <p>Your stats are looking sharp today.</p>
            </div>
          } />
=======


          <Route path="/profile" element={<Profile />} />

>>>>>>> Stashed changes
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
