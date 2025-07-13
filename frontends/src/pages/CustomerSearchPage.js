import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerSearchPage = () => {
  const [locations, setLocations] = useState({});
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/store/locations`);
        setLocations(res.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleMedicineInput = async (e) => {
    const value = e.target.value;
    setMedicineName(value);

    if (value.length >= 2) {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/medicine/suggestions`, {
          params: { query: value }
        });
        setSuggestions(res.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setMedicineName(suggestion);
    setSuggestions([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stock/availability`, {
        params: {
          state: selectedState,
          city: selectedCity,
          medicineName
        }
      });

      setResults(res.data);
      if (res.data.length === 0) {
      setMessage('Currently no medical store has this medicine ❌');
    } else {
      setMessage('');  // Clear old message
    }
    } catch (error) {
      console.error(error);
      setResults([]);
      setMessage(error.response?.data?.error || 'Search failed ❌');
    }
  };

  const handleViewOnMap = (address) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '30px auto',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#f7f9fc',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Search Medicine Availability</h2>

      <form onSubmit={handleSearch}>
        <label style={{ fontWeight: 'bold', marginBottom: '6px', display: 'block' }}>State:</label>
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity('');
          }}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        >
          <option value="">Select State</option>
          {Object.keys(locations).map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <label style={{ fontWeight: 'bold', marginBottom: '6px', display: 'block' }}>City:</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        >
          <option value="">Select City</option>
          {selectedState && locations[selectedState].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <label style={{ fontWeight: 'bold', marginBottom: '6px', display: 'block' }}>Medicine Name:</label>
        <input
          type="text"
          placeholder="Enter Medicine Name"
          value={medicineName}
          onChange={handleMedicineInput}
          required
          autoComplete="off"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />

        {suggestions.length > 0 && (
          <ul style={{
            border: '1px solid #ccc',
            maxHeight: '150px',
            overflowY: 'auto',
            listStyle: 'none',
            padding: '0',
            marginTop: '-10px',
            marginBottom: '15px',
            backgroundColor: 'white',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
          }}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseOut={(e) => e.target.style.backgroundColor = ''}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '16px'
          }}
        >
          Search
        </button>
      </form>

      {message && (
        <p style={{
          color: 'red',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '10px'
        }}>{message}</p>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#333' }}>Available Stores:</h3>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {results.map((item, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: '#e9f5ff',
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '6px'
                }}
              >
                <strong>{item.storeName}</strong> ({item.location}) - Quantity: {item.quantity}
                <br />
                <button
                  onClick={() => handleViewOnMap(item.location)}
                  style={{
                    marginTop: '5px',
                    backgroundColor: '#28a745',
                    border: 'none',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                >
                  View on Map
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomerSearchPage;
