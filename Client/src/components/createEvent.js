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
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragError, setDragError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateFile = (file) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      return `File ${file.name} is not a valid image type. Please use PNG, JPEG, JPG, or WebP.`;
    }
    
    if (file.size > maxSize) {
      return `File ${file.name} is too large. Please use images smaller than 5MB.`;
    }
    
    return null;
  };

  const handleFiles = (newFiles) => {
    setDragError('');
    const fileArray = Array.from(newFiles);
    const validFiles = [];
    const errors = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setDragError(errors.join(' '));
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
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
                  
                  {/* Drag and Drop Zone */}
                  <div
                    className={`border-2 border-dashed rounded p-4 text-center mb-3 ${
                      isDragOver 
                        ? 'border-primary bg-light' 
                        : 'border-secondary'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input').click()}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backgroundColor: isDragOver ? '#f8f9fa' : 'transparent'
                    }}
                  >
                    <FiImage size={32} className="text-muted mb-2" />
                    <div className="text-muted">
                      <strong>Drag and drop images here</strong>
                      <br />
                      <small>or click to browse files</small>
                    </div>
                    <div className="text-muted mt-1">
                      <small>Supports PNG, JPEG, JPG, WebP (max 5MB each)</small>
                    </div>
                  </div>

                  {/* File Input */}
                  <Form.Control
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    multiple
                    onChange={(e) => handleFiles(e.target.files)}
                    style={{ display: 'none' }}
                    id="file-input"
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => document.getElementById('file-input').click()}
                    className="mb-3"
                  >
                    Browse Files
                  </Button>

                  {/* Error Display */}
                  {dragError && (
                    <Alert variant="danger" className="mt-2">
                      {dragError}
                    </Alert>
                  )}

                  {/* File Previews */}
                  {files.length > 0 && (
                    <div className="mt-3">
                      <h6>Selected Images ({files.length})</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {files.map((f, i) => (
                          <div key={i} className="position-relative">
                            <Image 
                              src={URL.createObjectURL(f)} 
                              alt={`preview-${i}`} 
                              thumbnail 
                              style={{ width: 96, height: 96, objectFit: 'cover' }} 
                            />
                            <Button
                              variant="danger"
                              size="sm"
                              className="position-absolute top-0 end-0"
                              style={{ 
                                transform: 'translate(50%, -50%)',
                                width: '20px',
                                height: '20px',
                                padding: '0',
                                fontSize: '12px',
                                borderRadius: '50%'
                              }}
                              onClick={() => removeFile(i)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
