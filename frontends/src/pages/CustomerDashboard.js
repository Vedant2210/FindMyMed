import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const name = localStorage.getItem('customerName');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customerName');
    navigate('/login-customer');
  };

  return (
    <div style={styles.container}>
      {/* Top-right Logout button */}
      <div style={styles.logoutContainer}>
        <button onClick={handleLogout} style={styles.logoutButton}>🚪 Logout</button>
      </div>

      {/* Welcome message */}
      <h2 style={styles.welcome}>Welcome, {name} 👋</h2>

      {/* Main action buttons */}
      <div style={styles.buttonContainer}>
        <Link to="/search-medicine">
          <button style={styles.actionButton}>🔍 Search Medicine Availability</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    position: 'relative',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '50px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  logoutContainer: {
    position: 'absolute',
    top: '15px',
    right: '15px',
  },
  logoutButton: {
    padding: '8px 12px',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  welcome: {
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  actionButton: {
    padding: '12px 20px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default CustomerDashboard;
