import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroCard}>
        <h1 style={styles.title}>FindMyMed 🏥</h1>
        <p style={styles.subtitle}>Welcome! Start by logging in or registering:</p>

        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#3498db')}
            onClick={() => navigate('/login-options')}
          >
            🔑 Login
          </button>

          <button
            style={{ ...styles.button, backgroundColor: '#2ecc71' }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#27ae60')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#2ecc71')}
            onClick={() => navigate('/register-options')}
          >
            📝 Register
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.featuresSection}>
        <h2>Why Choose FindMyMed?</h2>
        <ul>
          <li>✔️ Real-time Medicine Availability</li>
          <li>✔️ Nearby Pharmacy Locator</li>
          <li>✔️ Online Medicine Ordering</li>
          <li>✔️ Quick Login and Registration</li>
        </ul>
      </div>

      {/* Statistics / Social Proof Section */}
      <div style={styles.statsSection}>
        <h2>Trusted by Medical Community 💙</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3>100+</h3>
            <p>Medical Store Owners</p>
          </div>
          <div style={styles.statCard}>
            <h3>800+</h3>
            <p>Active Users</p>
          </div>
          <div style={styles.statCard}>
            <h3>1200+</h3>
            <p>Medicines Tracked</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div style={styles.aboutSection}>
        <h2>About Us</h2>
        <p>
          FindMyMed is your one-stop solution for locating medicines at nearby stores,
          booking them online, and getting notified about medicine availability in real-time.
        </p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>© 2025 FindMyMed. All Rights Reserved.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)',
    minHeight: '100vh',
    padding: '0',
    margin: '0'
  },
  heroCard: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '40px auto 20px auto',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '15px'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '30px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  button: {
    padding: '12px 20px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3498db',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  featuresSection: {
    backgroundColor: '#f7f9fc',
    padding: '30px 20px',
    textAlign: 'center',
    margin: '20px 0'
  },
  statsSection: {
    backgroundColor: '#ffffff',
    padding: '30px 20px',
    textAlign: 'center',
    margin: '20px auto',
    maxWidth: '800px',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
  },
  statsGrid: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px'
  },
  statCard: {
    flex: '1 1 200px',
    backgroundColor: '#f0f4f8',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)'
  },
  aboutSection: {
    backgroundColor: 'white',
    padding: '30px 20px',
    textAlign: 'center',
    margin: '20px auto',
    maxWidth: '700px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  footer: {
    backgroundColor: '#2c3e50',
    color: 'white',
    textAlign: 'center',
    padding: '15px 10px',
    marginTop: '30px'
  }
};

export default LandingPage;
