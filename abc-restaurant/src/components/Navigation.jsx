import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Navigation.css'; // Custom CSS
import logo from "../images/logo.png";
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const { user, userRole, handleLogout, loading } = useContext(UserContext);
  const navigate = useNavigate();
  
  if (loading) return <p>Loading...</p>;

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Navbar.Brand href="/" className="navbar-logo">
        <img src={logo} alt="ABC Restaurant Logo" />
        ABC Restaurant
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto mb-2 mb-lg-0">
          {userRole ? (
            <>
              {userRole === 'admin' && (
                <>
                  <Nav.Link onClick={() => navigate('/admin-dashboard')}>Dashboard</Nav.Link>
                  <Nav.Link onClick={() => navigate('/user-management')}>User Management</Nav.Link>
                  <Nav.Link onClick={() => navigate('/queries')}>Queries</Nav.Link>
                  <Nav.Link onClick={() => navigate('/services')}>Services</Nav.Link>
                  <Nav.Link onClick={() => navigate('/menu-categories')}>Menus</Nav.Link>
                  <Nav.Link onClick={() => navigate('/special-offers')}>Offer</Nav.Link>
                </>
              )}
              {userRole === 'staff' && (
                <>
                  <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
                  <Nav.Link onClick={() => navigate('/reservations')}>Reservations</Nav.Link>
                  <Nav.Link onClick={() => navigate('/queries')}>Customer Queries</Nav.Link>
                  <Nav.Link onClick={() => navigate('/menu-category')}>Menu Category</Nav.Link>
                  <Nav.Link onClick={() => navigate('/menu-item')}>Menu Item</Nav.Link>
                </>
              )}
              {userRole === 'customer' && (
                <>
                  <Nav.Link onClick={() => navigate('/customer-dashboard')}>Dashboard</Nav.Link>
                  <Nav.Link onClick={() => navigate('/reservations')}>Reservations</Nav.Link>
                  <Nav.Link onClick={() => navigate('/menu')}>Menu</Nav.Link>
                  <Nav.Link onClick={() => navigate('/gallery')}>Gallery</Nav.Link>
                  <Nav.Link onClick={() => navigate('/submit-query')}>Submit Query</Nav.Link>
                </>
              )}
            </>
          ) : (
            <>
              <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate('/about')}>About Us</Nav.Link>
              <Nav.Link onClick={() => navigate('/contact')}>Contact Us</Nav.Link>
              <Nav.Link onClick={() => navigate('/service')}>Our Services</Nav.Link>
              <Nav.Link onClick={() => navigate('/special-offers')}>Special Offers</Nav.Link>
            </>
          )}
        </Nav>
        <div className="d-flex">
          {userRole ? (
            <>
              <button className="btn-outline-primary me-2" onClick={() => navigate('/profile')}>Profile</button>
              <button className="btn-outline-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn-outline-primary me-2" onClick={() => navigate('/registration')}>Register</button>
              <button className="btn-outline-success" onClick={() => navigate('/login')}>Login</button>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
