import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserProvider } from './components/UserContext'; 
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';
import Registration from './components/Registration';
import Login from './components/Login';
import CustomerDashboard from './components/customer/CustomerDashboard';


function App() {
  return (
    <UserProvider> 
        <BrowserRouter>
        <Routes>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="" element={<Footer />} />
        </Routes>
        </BrowserRouter>
      </UserProvider> 
  );
}

export default App;
