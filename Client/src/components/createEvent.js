import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Alert, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiFileText, FiImage } from 'react-icons/fi';
import { API_BASE } from '../lib/apiBase';
import EventPostPreview from './EventPostPreview';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]); // File[]
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('date', formData.date);
      fd.append('description', formData.description);
      files.forEach(f => fd.append('images', f));

      await axios.post(`${API_BASE}/events`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccess(true);
      setFormData({ title: '', date: '', description: '' });
      setFiles([]);
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

                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center gap-2">
                    <FiImage /> Event Images
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    multiple
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  />
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {files.map((f, i) => (
                      <Image key={i} src={URL.createObjectURL(f)} alt={`preview-${i}`} thumbnail style={{ width: 96, height: 96, objectFit: 'cover' }} />
                    ))}
                  </div>
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="success">Submit Event</Button>
                </div>
              </Form>
            </Col>

            <Col md={5} className="mt-4 mt-md-0">
              <div className="p-2">
                <h6 className="mb-3 d-flex align-items-center">
                  <FiFileText className="me-2" /> Live Preview
                </h6>
                <EventPostPreview
                  title={formData.title}
                  date={formData.date}
                  description={formData.description}
                  files={files}
                />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateEvent;
