import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Registration.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from '../components/Navigation';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    user_role : "customer"
  });
  const [check, setCheck] = useState(false);

  const handleChange = (event) => {
    setSignUpInfo({ ...signUpInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      address,
      city,
    } = signUpInfo;
  
    // Validate required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone || !address || !city) {
      toast.error("Please fill out all fields");
      return;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    // Validate terms acceptance
    if (!check) {
      toast.error("You must accept the Terms of Use & Privacy Policy");
      return;
    }
  
    console.log("Request data: " + JSON.stringify(signUpInfo, null, 2)); // Pretty-printed JSON format
  
    try {
      const response = await axios.post('http://localhost:4000/user/register', signUpInfo);
      console.log('API is successfully sent');
      toast.success(response.data.msg);
      setSignUpInfo({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "", // Reset confirm password
        phone: "",
        address: "",
        city: "",
        user_role: "customer", // Reset user role
      }); // Reset form fields
      navigate("/"); // Redirect to home or login page
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg || 'Registration failed');
      } else {
        toast.error('Server error');
      }
    }
  };
  

  return (
    <>
      <NavigationBar />
      <ToastContainer position="top-center" />
      <div className="registration-background">
        <Container className="registration-container">
          <Row className="justify-content-md-center">
            <Col xs={12} md={10} lg={8}>
              <h2 className="text-center">Registration Form</h2>
              <div className="registration-form">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={signUpInfo.firstName}
                          onChange={handleChange}
                          placeholder="Enter first name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={signUpInfo.lastName}
                          onChange={handleChange}
                          placeholder="Enter last name"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={signUpInfo.email}
                          onChange={handleChange}
                          placeholder="Enter email"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={signUpInfo.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={signUpInfo.address}
                          onChange={handleChange}
                          placeholder="Enter address"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={signUpInfo.city}
                          onChange={handleChange}
                          placeholder="Enter city"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={signUpInfo.password}
                          onChange={handleChange}
                          placeholder="Enter password"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={signUpInfo.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm password"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="formTerms">
                    <Form.Check
                      type="checkbox"
                      name="Check"
                      checked={check}
                      onChange={(e) => setCheck(e.target.checked)}
                      label="I accept the Terms of Use & Privacy Policy"
                      className="terms"
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-center">
                    <Button
                      variant="danger"
                      type="submit"
                      className="register-button"
                    >
                      Register Now
                    </Button>
                  </div>

                  <div className="mt-3 d-flex justify-content-center text-center">
                    <p>
                      Already have an account?{" "}
                      <Nav.Link className="login-button" onClick={() => navigate('/login')}>Login</Nav.Link>
                    </p>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RegistrationPage;
