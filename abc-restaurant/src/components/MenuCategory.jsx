import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './Navigation';
import Footer from './Footer';
import '../style/MenuCategory.css';
import MenuItem from './MenuItem';

const MenuCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal state

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:4000/menu-categories/get-all-menu-categories');
      setCategories(res.data);
      console.dir(res.data, { depth: null });
      console.log('Menu Categories :', JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error fetching categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      description,
      img,
    };

    try {
      if (editCategory) {
        await axios.put(`http://localhost:4000/menu-categories/update-menu-categories/${editCategory.category_id}`, formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        toast.success('Category updated successfully!');
      } else {
        await axios.post('http://localhost:4000/menu-categories/create-menu-categories', formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        toast.success('Category added successfully!');
      }
      fetchCategories();
      resetForm();
      handleModalClose(); // Close modal after successful form submission
    } catch (error) {
      console.error('Error submitting category:', error);
      toast.error('Error submitting category');
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
    setImg(null);
    setEditCategory(null);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:4000/menu-categories/delete-menu-categories/${categoryId}`);
      fetchCategories();
      toast.success('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Error deleting category');
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setName(category.name);
    setDescription(category.description);
    setImg(null); // Reset image
    setShowModal(true); // Open modal for editing
  };

  const handleModalClose = () => setShowModal(false); // Close modal handler

  const handleAddNewCategory = () => {
    resetForm();
    setShowModal(true); // Open modal for adding new category
  };

  return (
    <>
      <NavigationBar />
      <Container className="menu-category-container mt-5" id="menu-category-container">
        <ToastContainer autoClose={5000} /> {/* Toast container for notifications */}
        <h1 className="text-center mb-4">Manage Menu Categories</h1>
        
        <Button variant="primary" onClick={handleAddNewCategory} className="mb-4">
          Add New Category
        </Button>

        <Row className="category-list">
          {categories.map((category) => (
            <Col md={4} key={category.category_id} className="mb-4">
              <Card className="category-item shadow-sm">
                {category.img && (
                  <Card.Img
                    variant="top"
                    src={`data:image/jpeg;base64,${category.img}`}
                    alt={category.name}
                    className="category-image"
                  />
                )}
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Card.Text>{category.description}</Card.Text>
                  <Button variant="warning" onClick={() => handleEdit(category)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(category.category_id)}>
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
            <Modal.Title>{editCategory ? 'Update Category' : 'Add Category'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} className="menu-category-form">
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="categoryName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter category name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="categoryImage">
                    <Form.Label>Category Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="categoryDescription" className="mb-3">
                <Form.Label>Category Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter category description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {editCategory ? 'Update' : 'Add'} Category
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      <MenuItem />
      <Footer />
    </>
  );
};

export default MenuCategory;
