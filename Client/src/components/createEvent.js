import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      <Card className="shadow-sm p-4">
        <h2 className="mb-4 text-center text-primary">Create New Event</h2>

        {success && <Alert variant="success">Event created successfully!</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

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
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter event details..."
            />
          </Form.Group>

          <Button type="submit" variant="success" className="w-100">
            Submit Event
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateEvent;
