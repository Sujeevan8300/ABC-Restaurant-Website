import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './Navigation';
import Footer from './Footer';
import '../style/Service.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);
  const [serviceType, setServiceType] = useState('reservation');
  const [editService, setEditService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:4000/services/get-all-services');
      setServices(res.data);
      console.dir(res.data, { depth: null });
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Error fetching services');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      service_name: serviceName,
      description,
      img,
      service_type: serviceType,
    };

    try {
      if (editService) {
        await axios.put(`http://localhost:4000/services/update-service/${editService.service_id}`, formData);
        toast.success('Service updated successfully!');
      } else {
        await axios.post('http://localhost:4000/services/create-service', formData);
        toast.success('Service added successfully!');
      }
      fetchServices();
      resetForm();
      handleModalClose(); 
    } catch (error) {
      console.error('Error submitting service:', error);
      toast.error('Error submitting service');
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
    setServiceName('');
    setDescription('');
    setImg(null);
    setServiceType('reservation');
    setEditService(null);
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:4000/services/delete-service/${serviceId}`);
      fetchServices();
      toast.success('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Error deleting service');
    }
  };

  const handleEdit = (service) => {
    setEditService(service);
    setServiceName(service.service_name);
    setDescription(service.description);
    setServiceType(service.service_type);
    setImg(service.img ? `data:image/jpeg;base64,${service.img}` : null); 
    setShowModal(true); 
  };

  const handleModalClose = () => setShowModal(false); 
  const handleAddNewService = () => {
    resetForm();
    setShowModal(true); 
  };

  return (
    <>
      <NavigationBar />
      <Container className="services-container mt-5">
        <ToastContainer autoClose={5000} />
        <h1 className="text-center mb-4">Manage Services</h1>
        
        <Button variant="primary" onClick={handleAddNewService} className="mb-4">
          Add New Service
        </Button>

        <Row className="service-list">
          {services.map((service) => (
            <Col md={4} key={service.service_id} className="mb-4">
              <Card className="service-item shadow-sm">
                {service.img && (
                  <Card.Img
                    variant="top"
                    src={`data:image/jpeg;base64,${service.img}`}
                    alt={service.service_name}
                    className="service-image"
                  />
                )}
                <Card.Body>
                  <Card.Title>{service.service_name}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <Button variant="warning" onClick={() => handleEdit(service)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(service.service_id)}>
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
            <Modal.Title>{editService ? 'Update Service' : 'Add Service'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="serviceName">
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter service name"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="serviceImage">
                    <Form.Label>Service Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="serviceType" className="mb-3">
                <Form.Label>Service Type</Form.Label>
                <Form.Control
                  as="select"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  required
                >
                  <option value="reservation">Reservation</option>
                  <option value="delivery">Delivery</option>
                  <option value="dine-in">Dine-in</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="serviceDescription" className="mb-3">
                <Form.Label>Service Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter service description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {editService ? 'Update' : 'Add'} Service
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default Services;
