import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Card, Container, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from 'jwt-decode';
import '../../style/UserManagement.css';
import NavigationBar from '../../components/Navigation';
import Footer from '../../components/Footer'; 


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(['admin', 'staff', 'customer']); // Updated roles to include 'customer'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    role: '',
    password: '',
    confirmPassword: '', // Added confirmPassword
  });
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.log('No token found');
        toast.error('You are not authenticated');
        return;
      }

      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);

      const res = await axios.get('http://localhost:4000/user/view-users', {
        headers: {
          Authorization: `Bearer ${token}`, // Fixed the template string
        },
      });

      if (res.data && Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else {
        console.error('API response does not contain a valid users array:', res.data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error fetching users');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');

      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      const userData = { ...formData };
      delete userData.confirmPassword; // Remove confirmPassword from data sent to server

      console.log('Upadate user data : '+userData.city);

      if (editUser) {
        await axios.put(`http://localhost:4000/user/update-user/${editUser.user_id}`, userData, {
          headers: {
            Authorization: `Bearer ${token}`, // Fixed the template string
          },
        });
        toast.success('User updated successfully!');
      } else {
        await axios.post('http://localhost:4000/user/register', userData, {
          headers: {
            Authorization: `Bearer ${token}`, // Fixed the template string
          },
        });
        toast.success('User added successfully!');
      }
      fetchUsers();
      resetForm();
      handleModalClose();
    } catch (error) {
      console.error('Error submitting user:', error);
      if (error.response) {
        // Log the response data for debugging
        console.error('Response data:', error.response.data);
        toast.error(error.response.data.msg || 'Error submitting user');
      } else {
        toast.error('Server error');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      role: '',
      password: '',
      confirmPassword: '', // Reset confirmPassword
    });
    setEditUser(null);
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');

      await axios.delete(`http://localhost:4000/user/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Fixed the template string
        },
      });
      fetchUsers();
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      role: user.user_role || '',
      password: '', 
      confirmPassword: '', 
    });
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const handleAddNewUser = () => {
    resetForm();
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Group users by role
  const groupedUsers = roles.reduce((acc, role) => {
    acc[role] = users.filter(user => user.user_role === role);
    return acc;
  }, {});

  return (
    <>
      <NavigationBar />
      <Container className="user-management-container mt-5">
        <ToastContainer autoClose={5000} />
        <h1 className="text-center mb-4">Manage Users</h1>

        <div className="add-user-wrapper">
          <Button variant="primary" onClick={handleAddNewUser} className="mb-4 add-user-button">
            Add New User
          </Button>
        </div>

        <Row>
          {roles.map(role => (
            <Col md={4} key={role}>
              <h3 className="text-center mb-3">{role.charAt(0).toUpperCase() + role.slice(1)}s</h3>
              {groupedUsers[role].length > 0 ? (
                groupedUsers[role].map(user => (
                  <Card className="user-card shadow-sm mb-4" key={user.user_id}>
                    <Card.Body>
                      <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
                      <Card.Text><strong>Email: </strong>{user.email}</Card.Text>
                      <Card.Text><strong>Phone: </strong>{user.phone}</Card.Text>
                      <Card.Text><strong>Address: </strong>{user.address}</Card.Text>
                      <Card.Text><strong>City: </strong>{user.city}</Card.Text>
                      <Card.Text><strong>Role: </strong>{user.user_role}</Card.Text>
                      <Button variant="warning" onClick={() => handleEdit(user)} className="me-2">
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(user.user_id)}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No users found for this role.</p>
              )}
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editUser ? 'Update User' : 'Add User'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formFirstName" className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="firstName"
                      placeholder="Enter first name" 
                      value={formData.firstName} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formLastName" className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="lastName"
                      placeholder="Enter last name" 
                      value={formData.lastName} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email"
                  placeholder="Enter email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                  type="text" 
                  name="phone"
                  placeholder="Enter phone number" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>

              <Form.Group controlId="formAddress" className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                  type="text" 
                  name="address"
                  placeholder="Enter address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>

              <Form.Group controlId="formCity" className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control 
                  type="text" 
                  name="city"
                  placeholder="Enter city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>

              <Form.Group controlId="formRole" className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password"
                  placeholder="Enter password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required={editUser === null} // Require password only when adding a new user
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Confirm password" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  required={editUser === null} // Require confirmPassword only when adding a new user
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {editUser ? 'Update User' : 'Add User'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default UserManagement;
