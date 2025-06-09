import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert, ListGroup } from 'react-bootstrap';

const Enrolments = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/enrolments`, { name, email, message });
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again later.');
    }
  };

  const enrolmentDocuments = [
    { name: 'Information Handbook', file: '/enrolments/Parent and Student Handbook.pdf' },
    { name: 'Enrolment Policy', file: '/enrolments/Enrolment Policy.pdf' },
    { name: 'Privacy Collection Statement', file: '/enrolments/Privacy Collection Statement.pdf' },
    { name: 'Referral Form', file: '/enrolments/Enrolment Referral Form.pdf' },
    { name: 'Enrolment Agreement', file: '/enrolments/Enrolment Agreement.pdf' }
  ];

  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="section-pale-sage py-5">
        <Container>
          <h2 className="text-center fw-bold text-primary mb-3 display-5">Enrolments</h2>
          <p className="text-center text-muted lead mb-5">
            Find out if you're eligible and how to apply for enrolment at The Avenue School.
          </p>

          <Row className="g-4 mb-5">
            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="fw-bold mb-3" style={{ color: '#2b333d' }}>
                    Who Can Enrol
                  </Card.Title>
                  <ul style={{ color: '#2b333d' }}>
                    <li>Students aged 15–20 eligible for Senior Secondary Education</li>
                    <li>Those who’ve experienced school refusal or irregular attendance</li>
                    <li>Youth at risk of disengaging from school</li>
                    <li>Students who’ve not completed a Senior Secondary Certificate</li>
                    <li>Applicants who will benefit from our flexible, alternative approach</li>
                    <li>Students motivated to pursue their education pathway</li>
                  </ul>
                  <p className="mt-3 mb-1 fw-bold">Priority is given to:</p>
                  <ul style={{ color: '#2b333d' }}>
                    <li>Current Cottage Program students at Mountain District Learning Centre</li>
                    <li>Students with diagnosed anxiety or mental health-related learning barriers</li>
                  </ul>
                  <p className="mt-3">
                    <strong>Note:</strong> Class caps apply. Waiting lists are maintained.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="fw-bold mb-3 text-center" style={{ color: '#2b333d' }}>
                    Enrolment Documents
                  </Card.Title>
                  <ListGroup variant="flush">
                    {enrolmentDocuments.map((doc, index) => (
                      <ListGroup.Item key={index} action href={doc.file} target="_blank" download>
                        {doc.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <p className="mt-2 text-muted text-center">
                    Click a document to download.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section-stone py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="text-center fw-bold mb-4" style={{ color: '#2b333d' }}>
                    Enrolment Inquiry
                  </Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#2b333d' }}>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#2b333d' }}>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#2b333d' }}>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Your message or inquiry"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100 fw-semibold text-uppercase">
                      Submit
                    </Button>
                    {submitted && (
                      <Alert variant="success" className="mt-3 text-center">
                        Thank you! Your message has been sent.
                      </Alert>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Enrolments;
