import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiFileText } from 'react-icons/fi';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/events`, formData);
      setSuccess(true);
      setFormData({ title: '', date: '', description: '' });
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="link" className="text-decoration-none" onClick={() => navigate(-1)}>
          <FiArrowLeft className="me-1" /> Back
        </Button>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white py-3">
          <h4 className="mb-0 d-flex align-items-center">
            <FiCalendar className="text-primary me-2" /> Create New Event
          </h4>
        </Card.Header>
        <Card.Body className="p-4">
          {success && <Alert variant="success">Event created successfully!</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Row>
            <Col md={7}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter event title"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Enter event details..."
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="success">Submit Event</Button>
                </div>
              </Form>
            </Col>

            <Col md={5} className="mt-4 mt-md-0">
              <div className="p-3 border rounded-3 bg-light h-100">
                <h6 className="mb-3 d-flex align-items-center">
                  <FiFileText className="me-2" /> Live Preview
                </h6>
                <div>
                  <div className="fw-bold">{formData.title || 'Event title'}</div>
                  <div className="text-muted mb-2">{formData.date || 'yyyy-mm-dd'}</div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{formData.description || 'Event description...'}</div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateEvent;

