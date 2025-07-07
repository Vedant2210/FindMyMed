import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const RegisterCustomerPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user/register-customer', {
        name,
        email,
        password,
      });
      setMessage('✅ Customer Registered Successfully');
      navigate('/login-customer');
    } catch (error) {
      const errorMsg = error.response?.data?.error || '❌ Registration Failed';
      setMessage(errorMsg);

      if (errorMsg.includes('User already exists')) {
        setUserExists(true);
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google user:', decoded);

      await axios.post('http://localhost:5000/api/user/register-customer', {
        name: decoded.name,
        email: decoded.email,
        password: 'googleauth', // Dummy password for Google users
      });

      setMessage('✅ Google Registration Successful');
      navigate('/login-customer');
    } catch (err) {
      console.error('Google Registration Error:', err);

      const errorMsg = err.response?.data?.error || '❌ Google Registration Failed';
      setMessage(errorMsg);

      if (errorMsg.includes('User already exists')) {
        setUserExists(true);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register as Customer</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">Register</button>
      </form>

      <p style={{ marginTop: '20px' }}>Or register with Google:</p>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => setMessage('❌ Google Registration Failed')}
      />

      {message && <p style={styles.message}>{message}</p>}

      {userExists && (
        <button
          style={{ ...styles.button, backgroundColor: '#1976d2', marginTop: '10px' }}
          onClick={() => navigate('/login-customer')}
        >
          Go to Login Page
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
  message: {
    marginTop: '15px',
    fontWeight: 'bold',
    color: '#d32f2f',
  },
};

export default RegisterCustomerPage;
