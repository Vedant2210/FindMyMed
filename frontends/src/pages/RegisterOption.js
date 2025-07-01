import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterOptions = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Select Registration Type</h2>
      <button style={styles.button} onClick={() => navigate('/register-customer')}>👤 Customer Register</button>
      <button style={styles.button} onClick={() => navigate('/register-storeowner')}>🏪 Store Owner Register</button>
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
    backgroundColor: '#e67e22',
    color: 'white',
    cursor: 'pointer'
  }
};

export default RegisterOptions;
