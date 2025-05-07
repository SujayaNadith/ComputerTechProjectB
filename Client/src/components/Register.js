import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
  const [accountType, setAccountType] = useState('');
  const [formData, setFormData] = useState({
    givenName: '',
    lastName: '',
    accountType: '',
    accountId: '',
    password: '',
    confirmPassword: ''
  });

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log('Registered Data:', formData);
    alert('Registration successful!');
  };

  return (
    <Container className="d-flex justify-content-center py-5 my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Card style={{ width: '100%', maxWidth: '600px' }} className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-2 text-center fw-bold" style={{ color: '#2b333d' }}>
            Register
          </Card.Title>
          <p className="text-center text-muted mb-4">Create your Avenue School account</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2b333d' }}>Given Name(s)</Form.Label>
              <Form.Control
                type="text"
                name="givenName"
                value={formData.givenName}
                onChange={handleChange}
                placeholder="Enter your given name(s)"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2b333d' }}>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2b333d' }}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2b333d' }}>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
            </Form.Group>

            <div className="mb-4 d-flex align-items-center gap-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <label htmlFor="accountType" className="mb-0 fw-medium" style={{ color: '#2b333d' }}>
                You are a
              </label>
              <Form.Select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={(e) => {
                  handleChange(e);
                  setAccountType(e.target.value);
                }}
                required
                style={{ width: 'auto', minWidth: '200px' }}
              >
                <option value="">Select one</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </div>


            <Form.Group className="mb-4">
              <Form.Label style={{ color: '#2b333d' }}>
                {accountType ? `${capitalize(accountType)} ID` : 'Account ID'}
              </Form.Label>
              <Form.Control
                type="text"
                name="accountId"
                value={formData.accountId}
                onChange={handleChange}
                placeholder={`Enter your ${accountType || 'account'} ID`}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 fw-semibold text-uppercase">
              Register
            </Button>

            <div className="text-center mt-3">
              <span style={{ color: '#2b333d' }}>Already have an account? </span>
              <Link to="/login" className="fw-semibold text-decoration-none text-success">
                Log In
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
