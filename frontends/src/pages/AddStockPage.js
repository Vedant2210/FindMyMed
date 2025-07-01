import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStockPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const medRes = await axios.get('http://localhost:5000/api/medicine/all');
        setMedicines(medRes.data.medicines);

        const storeRes = await axios.get('http://localhost:5000/api/store/my-stores', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStores(storeRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('❌ Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleAddStock = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/stock/add', {
        storeId: selectedStore,
        medicineId: selectedMedicine,
        quantity: Number(quantity)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('✅ Stock added successfully');
      setSelectedStore('');
      setSelectedMedicine('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding stock:', error);
      toast.error(error.response?.data?.error || '❌ Failed to add stock');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>➕ Add Medicine Stock</h2>

      <form onSubmit={handleAddStock} style={styles.form}>
        <label style={styles.label}>Select Store:</label>
        <select
          style={styles.select}
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          required
        >
          <option value="">-- Select Store --</option>
          {stores.map((store) => (
            <option key={store._id} value={store._id}>{store.name}</option>
          ))}
        </select>

        <label style={styles.label}>Select Medicine:</label>
        <select
          style={styles.select}
          value={selectedMedicine}
          onChange={(e) => setSelectedMedicine(e.target.value)}
          required
        >
          <option value="">-- Select Medicine --</option>
          {medicines.map((med) => (
            <option key={med._id} value={med._id}>{med.name}</option>
          ))}
        </select>

        <input
          style={styles.input}
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <button type="submit" style={styles.button}>Add Stock ✅</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '30px',
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
    gap: '15px',
    maxWidth: '400px',
    margin: '0 auto'
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10px',
    fontWeight: 'bold'
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
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

export default AddStockPage;
