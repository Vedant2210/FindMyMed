import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginCustomerPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login-customer', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('customerName', res.data.name);

      toast.success('✅ Login Successful');
      navigate('/customer-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || '❌ Login Failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/google-login', {
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('customerName', res.data.name);

      toast.success('✅ Google Login Successful');
      navigate('/customer-dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('❌ Google Login Failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Customer Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <div style={styles.orSection}>
        <hr style={styles.hr} />
        <span>Or Login with Google</span>
        <hr style={styles.hr} />
      </div>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error('❌ Google Login Failed')}
      />

      <p style={styles.registerText}>
        Don't have an account?{' '}
        <Link to="/register-customer" style={styles.registerLink}>
          Register here
        </Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fefefe',
  },
  title: {
    marginBottom: '20px',
    color: '#2c3e50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '15px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  orSection: {
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#555',
  },
  hr: {
    flexGrow: 1,
    border: 'none',
    height: '1px',
    backgroundColor: '#ccc',
  },
  registerText: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#555',
  },
  registerLink: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default LoginCustomerPage;
