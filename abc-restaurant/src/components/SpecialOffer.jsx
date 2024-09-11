import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './Navigation';
import Footer from './Footer';
import '../style/SpecialOffer.css';

const SpecialOffer = () => {
  const [offers, setOffers] = useState([]);
  const [menuItems, setMenuItems] = useState([]); // Store menu items for dropdown
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);
  const [discount, setDiscount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [foodId, setFoodId] = useState(''); // Store selected food_id
  const [isActive, setIsActive] = useState(true); // Track offer active status
  const [editOffer, setEditOffer] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal state

  useEffect(() => {
    fetchOffers();
    fetchMenuItems(); // Fetch menu items on component load
  }, []);

  // Fetch all menu items for the dropdown
  const fetchMenuItems = async () => {
    try {
      const res = await axios.get('http://localhost:4000/menu-items/get-all-menu-items');
      console.log(res.data); // Log to verify the response
      setMenuItems(res.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast.error('Error fetching menu items');
    }
  };
  

  const fetchOffers = async () => {
    try {
      const res = await axios.get('http://localhost:4000/special-offers/get-all-special-offers');
      setOffers(res.data);
      console.dir(res.data, { depth: null });
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast.error('Error fetching offers');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('offer_title', title);
    formData.append('offer_description', description);
    formData.append('discount_percentage', discount);
    formData.append('offer_img', img);  // Ensure the image is handled as a file
    formData.append('offer_start_date', startDate);
    formData.append('offer_end_date', endDate);
    formData.append('food_id', foodId);
    formData.append('is_active', isActive);
  
    // Log the form data before making the request
    console.log({
      offer_title: title,
      offer_description: description,
      discount_percentage: discount,
      offer_img: img,
      offer_start_date: startDate,
      offer_end_date: endDate,
      food_id: foodId,
      is_active: isActive
    });
  
    try {
      if (editOffer) {
        console.log('hi : '+formData);
        await axios.put(`http://localhost:4000/special-offers/update-special-offer/${editOffer.offer_id}`, formData, 
          {
            headers: { 'Content-Type': 'application/json' },
          }
      );
        toast.success('Offer updated successfully!');
      } else {
        await axios.post('http://localhost:4000/special-offers/create-special-offer', formData,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        toast.success('Offer added successfully!');
      }
      fetchOffers();
      resetForm();
      handleModalClose();
    } catch (error) {
      console.error('Error submitting offer:', error);
      toast.error('Error submitting offer');
    }
  };  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result); // Save base64 encoded image
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDiscount('');
    setImg(null);
    setStartDate('');
    setEndDate('');
    setFoodId('');
    setIsActive(true);
    setEditOffer(null);
  };

  const handleDelete = async (offerId) => {
    try {
      await axios.delete(`http://localhost:4000/special-offers/delete-special-offer/${offerId}`);
      fetchOffers();
      toast.success('Offer deleted successfully!');
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast.error('Error deleting offer');
    }
  };

  const handleEdit = (offer) => {
    setEditOffer(offer);  // Set the offer being edited
    setTitle(offer.title);  // Set the title
    setDescription(offer.description);  // Set the description
    setDiscount(offer.discount_percentage);  // Set the discount percentage
    setStartDate(offer.offer_start_date.split('T')[0]);  // Ensure proper date format
    setEndDate(offer.offer_end_date.split('T')[0]);  // Ensure proper date format
    setFoodId(offer.food_id);  // Set the selected food item
    setIsActive(offer.is_active);  // Set active status
  
    // If there's an image, reset it so user can upload a new one or keep the old one
    setImg(null);
  
    setShowModal(true);  // Open modal for editing
  };

  const handleModalClose = () => setShowModal(false); // Close modal handler

  const handleAddNewOffer = () => {
    resetForm();
    setShowModal(true); // Open modal for adding new offer
  };

  return (
    <>
      <NavigationBar />
      <Container className="special-offer-container mt-5">
        <ToastContainer autoClose={5000} /> {/* Toast container for notifications */}
        <h1 className="text-center mb-4">Manage Special Offers</h1>

        <Button variant="primary" onClick={handleAddNewOffer} className="mb-4">
          Add New Offer
        </Button>

        <Row className="offer-list">
          {offers.map((offer) => (
            <Col md={4} key={offer.offer_id} className="mb-4">
              <Card className="offer-item shadow-sm">
                <Card.Body>
                  <Card.Title>{offer.title}</Card.Title>
                  {offer.img ? (
                    <Card.Img
                      variant="top"
                      src={`data:image/jpeg;base64,${offer.img}`}
                      alt={offer.title}
                      className="offer-image"
                    />
                  ) : (
                    <Card.Img
                      variant="top"
                      src="/path/to/placeholder-image.jpg" 
                      alt="No image available"
                      className="offer-image"
                    />
                  )}
                  <Card.Text>{offer.description}</Card.Text>
                  <Card.Text>Discount: {offer.discount_percentage}%</Card.Text>
                  {/* Format the start and end dates to only show the date part */}
                  <div className="date-container">
                    <Card.Text>Start from: {new Date(offer.offer_start_date).toLocaleDateString()}</Card.Text>
                    <Card.Text>End on: {new Date(offer.offer_end_date).toLocaleDateString()}</Card.Text>
                  </div>
                  <Button variant="warning" onClick={() => handleEdit(offer)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(offer.offer_id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal Form */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editOffer ? 'Update Offer' : 'Add Offer'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} className="special-offer-form">
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="offerTitle">
                    <Form.Label>Offer Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter offer title"
                      value={title}  // Set the title value
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="offerImage">
                    <Form.Label>Offer Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="offerDiscount" className="mb-3">
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter discount percentage"
                  value={discount}  // Set the discount value
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="offerDescription" className="mb-3">
                <Form.Label>Offer Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter offer description"
                  value={description}  // Set the description value
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="offerStartDate" className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}  // Set the start date value
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="offerEndDate" className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}  // Set the end date value
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="foodItem" className="mb-3">
                <Form.Label>Select Food Item</Form.Label>
                <Form.Control
                  as="select"
                  value={foodId}  // Set the selected food item
                  onChange={(e) => setFoodId(e.target.value)}
                  required
                >
                  <option value="">Select a food item</option>
                  {menuItems && menuItems.length > 0 && menuItems.map((item) => (
                    <option key={item.food_id} value={item.food_id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="isActive" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Active"
                  checked={isActive}  // Set the active status
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {editOffer ? 'Update Offer' : 'Add Offer'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default SpecialOffer;
