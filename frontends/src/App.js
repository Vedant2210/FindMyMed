import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import LandingPage from './pages/LandingPage';
import Register from './components/Register';
import SearchMedicine from './components/SearchMedicine';
import AddStorePage from './pages/AddStorePage';
import AddMedicinePage from './pages/AddMedicinePage';
import AddStockPage from './pages/AddStockPage';

import RegisterCustomerPage from './pages/RegisterCustomerPage';
import RegisterStoreOwner from './pages/RegisterStoreOwner';
import LoginCustomerPage from './pages/LoginCustomerPage';
import LoginStoreOwner from './pages/LoginStoreOwner';
import StoreDashboardPage from './pages/StoreDashboardPage';
import CustomerSearchPage from './pages/CustomerSearchPage';
import CustomerDashboard from './pages/CustomerDashboard';
import LoginOptions from './pages/LoginOptions';
import RegisterOptions from './pages/RegisterOption';

function App() {
  return (
    
    <GoogleOAuthProvider clientId="210760318204-ib4lb3e1h6ur4crpm0hr91tqgiv844k5.apps.googleusercontent.com">
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchMedicine />} />
          <Route path="/add-store" element={<AddStorePage />} />
          <Route path="/add-medicine" element={<AddMedicinePage />} />
          <Route path="/add-stock" element={<AddStockPage />} />

          <Route path="/register-customer" element={<RegisterCustomerPage />} />
          <Route path="/register-storeowner" element={<RegisterStoreOwner />} />
          <Route path="/login-customer" element={<LoginCustomerPage />} />
          <Route path="/login-storeowner" element={<LoginStoreOwner />} />

          <Route path="/store-dashboard" element={<StoreDashboardPage />} />
          <Route path="/search-medicine" element={<CustomerSearchPage />} />
          <Route path="/login-options" element={<LoginOptions />} />
          <Route path="/register-options" element={<RegisterOptions />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
