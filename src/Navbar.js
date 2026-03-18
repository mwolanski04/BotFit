import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link title="Home" to="/" style={{ textDecoration: 'none' }}>
        <div style={styles.logo}>BOTFIT</div>
      </Link>
      <ul style={styles.navLinks}>
        <li><Link to="/login" style={styles.link}>Login</Link></li>
        <li><Link to="/MealPlan" style={styles.link}>Meal Plan</Link></li>
        <li><Link to="/Profile" style={styles.link}>Profile</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: { display: 'flex', justifyContent: 'space-between', padding: '0 5%', height: '70px', alignItems: 'center', backgroundColor: '#1e1e1e' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#00ff88' },
  navLinks: { display: 'flex', listStyle: 'none', gap: '2rem' },
  link: { textDecoration: 'none', color: '#ccc', fontWeight: '500' }
};

export default Navbar;