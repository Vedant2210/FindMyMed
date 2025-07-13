import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStorePage = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleAddStore = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/store/add`, {
        name,
        location,
        contact,
        state,
        city
      }, config);

      toast.success('✅ ' + res.data.message);
      setName('');
      setLocation('');
      setContact('');
      setState('');
      setCity('');

      setTimeout(() => {
        navigate('/add-stock');
      }, 2000); // Navigate to Add Stock after 2 seconds
    } catch (error) {
      console.error(error);
      toast.error('❌ ' + (error.response?.data?.error || 'Failed to add store'));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🏪 Add Your Store</h2>

      <form onSubmit={handleAddStore} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Store Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          style={styles.input}
          placeholder="Location / Address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          style={styles.input}
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          style={styles.input}
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <input
          style={styles.input}
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <button type="submit" style={styles.button}>Add Store ✅</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    color: '#2c3e50',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    maxWidth: '400px',
    margin: '0 auto'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default AddStorePage;
