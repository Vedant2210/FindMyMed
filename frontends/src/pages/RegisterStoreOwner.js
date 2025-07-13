import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


const RegisterStoreOwnerPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/register-storeowner`, {
        name,
        email,
        password,
        role: 'storeowner'
      });
      setMessage('Store Owner Registered Successfully ✅');
      navigate('/login-storeowner');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration Failed ❌');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const googleName = decoded.name;
      const googleEmail = decoded.email;

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/register-storeowner`, {
        name: googleName,
        email: googleEmail,
        password: 'google_login_default',
        role: 'storeowner'
      });

      setMessage('Google Registration Successful ✅');
      navigate('/login-storeowner');
    } catch (error) {
      console.error('Google registration error:', error);
      setMessage('Google Registration Failed ❌');
    }
  };

  const handleGoogleFailure = () => {
    setMessage('Google Authentication Failed ❌');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Register as Store Owner</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Register
        </button>
      </form>

      <div style={{ textAlign: 'center', margin: '15px 0' }}>OR</div>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />

      {message && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{message}</p>}
    </div>
  );
};

export default RegisterStoreOwnerPage;
