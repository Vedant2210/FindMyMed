import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoreDashboardPage = () => {
  const navigate = useNavigate();
  const storeOwnerName = localStorage.getItem('storeOwnerName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('storeOwnerName');
    toast.info('🚪 Logged out successfully');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🏪 Store Owner Dashboard</h2>
      <p style={styles.welcomeText}>
        Welcome, <strong style={{ color: '#2c3e50' }}>{storeOwnerName}</strong> 👋
      </p>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate('/add-store')}>
          ➕ Add Store
        </button>
        <button style={styles.button} onClick={() => navigate('/add-medicine')}>
          💊 Add Medicine
        </button>
        <button style={styles.button} onClick={() => navigate('/add-stock')}>
          📦 Add Stock
        </button>
        <button style={styles.logoutButton} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '500px',
    margin: '50px auto',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    color: '#2c3e50',
    marginBottom: '15px'
  },
  welcomeText: {
    fontSize: '18px',
    marginBottom: '25px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
  },
  logoutButton: {
    padding: '12px 20px',
    backgroundColor: '#e74c3c',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
  }
};

// Button hover effects using inline styles
Object.assign(styles.button, {
  ':hover': {
    backgroundColor: '#2980b9',
    transform: 'translateY(-2px)'
  }
});
Object.assign(styles.logoutButton, {
  ':hover': {
    backgroundColor: '#c0392b',
    transform: 'translateY(-2px)'
  }
});

export default StoreDashboardPage;
