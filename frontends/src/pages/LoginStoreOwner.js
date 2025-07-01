import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginStoreOwnerPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 // const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/user/login-storeowner', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('storeOwnerName', res.data.name);
      toast.success('✅ Login Successful');
      navigate('/store-dashboard');
    } catch (error) {
      toast.error('❌ ' + (error.response?.data?.error || 'Login Failed'));
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const googleEmail = decoded.email;

      const res = await axios.post('http://localhost:5000/api/user/login-storeowner-google', {
        email: googleEmail
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('storeOwnerName', res.data.name);
      toast.success('✅ Google Login Successful');
      navigate('/store-dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('❌ Google Login Failed');
    }
  };

  const handleGoogleFailure = () => {
    toast.error('❌ Google Authentication Failed');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Store Owner Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
        >
          Login
        </button>
      </form>

      <div style={{ textAlign: 'center', margin: '15px 0' }}>OR</div>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '30px auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default LoginStoreOwnerPage;
