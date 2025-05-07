import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: '90vh', fontFamily: 'Montserrat, sans-serif' }}
    >
      <Card style={{ width: '100%', maxWidth: '500px' }} className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-center fw-bold mb-2" style={{ color: '#2b333d' }}>
            Log In
          </Card.Title>
          <p className="text-center text-muted mb-4">Access your Avenue School account</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2b333d' }}>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#2b333d' }}>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 fw-semibold text-uppercase">
              Log In
            </Button>
            <div className="text-center mt-3">
              <span style={{ color: '#2b333d' }}>Don't have an account? </span>
              <Link to="/register" className="fw-semibold text-decoration-none text-primary">
                Register
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
