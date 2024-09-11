import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Card, Container, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/MenuItem.css'; 

const MenuItem = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [img, setImg] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [editMenuItem, setEditMenuItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:4000/menu-categories/get-all-menu-categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error fetching categories');
    }
  };

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get('http://localhost:4000/menu-items/get-all-menu-items');
      setMenuItems(res.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast.error('Error fetching menu items');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name,
      description,
      price,
      available,
      img,
      category_id: categoryId,
    };
  
    try {
      if (editMenuItem) {
        await axios.put(`http://localhost:4000/menu-items/update-menu-items/${editMenuItem.food_id}`, formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        toast.success('Menu item updated successfully!');
      } else {
        await axios.post('http://localhost:4000/menu-items/create-menu-items', formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        toast.success('Menu item added successfully!');
      }
      fetchMenuItems();
      resetForm();
      handleModalClose(); // Close modal after successful submission
    } catch (error) {
      console.error('Error submitting menu item:', error);
      toast.error('Error submitting menu item!');
    }
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setAvailable(true);
    setImg(null);
    setCategoryId('');
    setEditMenuItem(null);
  };

  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`http://localhost:4000/menu-items/delete-menu-items/${foodId}`);
      fetchMenuItems();
      toast.success('Menu item deleted successfully');
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast.error('Error deleting menu item');
    }
  };

  const handleEdit = (menuItem) => {
    setEditMenuItem(menuItem);
    setName(menuItem.name || '');
    setDescription(menuItem.description || '');
    setPrice(menuItem.price || '');
    setAvailable(menuItem.available !== undefined ? menuItem.available : true);
    setCategoryId(menuItem.category_id || '');
    setImg(menuItem.img || null);
    setShowModal(true); // Show modal when editing
  };

  const handleModalClose = () => setShowModal(false);

  const handleAddNewMenuItem = () => {
    resetForm();
    setShowModal(true); // Open modal for adding new menu item
  };

  return (
    <>
      <Container className="menu-item-container mt-5">
        <ToastContainer autoClose={5000} />
        <h1 className="text-center mb-4">Manage Menu Items</h1>

        <div className="add-menu-item-wrapper">
            <Button variant="primary" onClick={handleAddNewMenuItem} className="mb-4 add-menu-item-button">
                Add New Menu Item
            </Button>
        </div>

        <Row className="category-list">
          {menuItems.map((item) => (
            <Col md={4} key={item.food_id} className="mb-4">
              <Card className="menu-item-card shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={item.img ? `data:image/jpeg;base64,${item.img}` : 'https://via.placeholder.com/200'} 
                  alt={item.name} 
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text><strong>Price: </strong>${item.price}</Card.Text>
                  <Card.Text><strong>Status: </strong>{item.available ? 'Available' : 'Not Available'}</Card.Text>
                  <Button variant="warning" onClick={() => handleEdit(item)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(item.food_id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
  
        {/* Modal for form */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editMenuItem ? 'Update Menu Item' : 'Add Menu Item'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="itemName" className="mb-3">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter item name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="itemPrice" className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                      type="number" 
                      placeholder="Enter price" 
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)} 
                      required 
                    />
                  </Form.Group>
                </Col>
              </Row>
  
              <Form.Group controlId="itemDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  placeholder="Enter description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required 
                />
              </Form.Group>
  
              <Row>
                <Col md={6}>
                  <Form.Group controlId="itemAvailable" className="mb-3">
                    <Form.Label>Availability</Form.Label>
                    <Form.Select value={available} onChange={(e) => setAvailable(e.target.value === 'true')} required>
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="itemCategory" className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.category_id} value={category.category_id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
  
              <Form.Group controlId="itemImage" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
              </Form.Group>
  
              <Button variant="primary" type="submit">
                {editMenuItem ? 'Update Menu Item' : 'Add Menu Item'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default MenuItem;
