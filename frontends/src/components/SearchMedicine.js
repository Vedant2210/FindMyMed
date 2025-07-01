import React, { useState } from 'react';
import axios from 'axios';

const SearchMedicine = () => {
  const [medicineName, setMedicineName] = useState('');
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search/medicine?name=${medicineName}`);
      setStores(response.data.stores);
      setError('');
    } catch (err) {
      setStores([]);
      setError(err.response.data.error || 'Error searching medicine');
    }
  };

  return (
    <div>
      <h2>Search Medicine Availability</h2>
      <input
        type="text"
        placeholder="Enter medicine name"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {stores.length > 0 && (
        <div>
          <h3>Available at:</h3>
          <ul>
            {stores.map((store, index) => (
              <li key={index}>
                <strong>{store.storeName}</strong> - {store.location} - Contact: {store.contact} - Qty: {store.availableQuantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchMedicine;
