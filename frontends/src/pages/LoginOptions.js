import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginOptions = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Select Login Type</h2>
      <button style={styles.button} onClick={() => navigate('/login-customer')}>👤 Customer Login</button>
      <button style={styles.button} onClick={() => navigate('/login-storeowner')}>🏪 Store Owner Login</button>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', marginTop: '50px' },
  button: {
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2ecc71',
    color: 'white',
    cursor: 'pointer'
  }
};

export default LoginOptions;
