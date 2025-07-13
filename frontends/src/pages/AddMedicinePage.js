import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMedicinePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddMedicine = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/medicine/add`, {
        name,
        description
      });

      toast.success(' Medicine added successfully');
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding medicine:', error);
      toast.error(error.response?.data?.error || '❌ Failed to add medicine');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>💊 Add New Medicine</h2>

      <form onSubmit={handleAddMedicine} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Medicine Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          style={styles.input}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" style={styles.button}>Add Medicine ✅</button>
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

export default AddMedicinePage;
