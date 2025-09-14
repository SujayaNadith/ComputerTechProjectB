import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col, Image, Spinner } from 'react-bootstrap';
import { FiArrowLeft, FiCalendar, FiImage, FiTrash2 } from 'react-icons/fi';
import { API_BASE } from '../lib/apiBase';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({ title: '', date: '', description: '' });
  const [existingImages, setExistingImages] = useState([]); // string URLs retained
  const [newFiles, setNewFiles] = useState([]); // File[]
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragError, setDragError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/events/${id}`);
        if (!alive) return;
        setFormData({
          title: data.title || '',
          date: data.date ? data.date.substring(0, 10) : '',
          description: data.description || '',
        });
        setExistingImages(Array.isArray(data.images) ? data.images : []);
      } catch (e) {
        if (!alive) return;
        setError('Unable to load event');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

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
      setNewFiles(prev => [...prev, ...validFiles]);
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

  const removeNewFile = (index) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('date', formData.date);
      fd.append('description', formData.description);
      fd.append('existingImages', JSON.stringify(existingImages));
      newFiles.forEach(f => fd.append('images', f));
      await axios.patch(`${API_BASE}/events/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/events');
    } catch (e) {
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const removeExisting = (url) => setExistingImages(imgs => imgs.filter(u => u !== url));

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

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
            <FiCalendar className="text-primary me-2" /> Edit Event
          </h4>
        </Card.Header>
        <Card.Body className="p-4">
          {error && <Alert variant="danger">{error}</Alert>}
          <Row>
            <Col md={7}>
              <Form onSubmit={handleSave}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={5} name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center gap-2">
                    <FiImage /> Add New Images
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
                    onClick={() => document.getElementById('file-input-edit').click()}
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
                    id="file-input-edit"
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => document.getElementById('file-input-edit').click()}
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

                  {/* New File Previews */}
                  {newFiles.length > 0 && (
                    <div className="mt-3">
                      <h6>New Images ({newFiles.length})</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {newFiles.map((f, i) => (
                          <div key={i} className="position-relative">
                            <Image 
                              src={URL.createObjectURL(f)} 
                              alt={`new-${i}`} 
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
                              onClick={() => removeNewFile(i)}
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
                  <Button type="submit" variant="success" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                </div>
              </Form>
            </Col>
            <Col md={5} className="mt-4 mt-md-0">
              <div className="p-4 border rounded-3 bg-light h-100">
                <h6 className="mb-3 d-flex align-items-center">
                  <FiImage className="me-2" />
                  Existing Images ({existingImages.length})
                </h6>
                {existingImages.length === 0 && (
                  <div className="text-center text-muted py-4">
                    <FiImage size={48} className="mb-2 opacity-50" />
                    <div>No existing images</div>
                  </div>
                )}
                <div className="d-flex flex-wrap gap-2">
                  {existingImages.map((url) => (
                    <div key={url} className="position-relative">
                      <Image 
                        src={url} 
                        alt="existing" 
                        thumbnail 
                        style={{ 
                          width: 96, 
                          height: 96, 
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '2px solid #e9ecef'
                        }} 
                      />
                      <Button 
                        size="sm" 
                        variant="danger" 
                        className="position-absolute top-0 end-0" 
                        onClick={() => removeExisting(url)} 
                        aria-label="Remove image"
                        style={{ 
                          transform: 'translate(50%, -50%)',
                          width: '24px',
                          height: '24px',
                          padding: '0',
                          fontSize: '12px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FiTrash2 size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
                {existingImages.length > 0 && (
                  <div className="mt-3 p-2 bg-white rounded border">
                    <small className="text-muted">
                      <strong>Note:</strong> Click the red × to remove existing images. 
                      New images will be added to the event.
                    </small>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditEvent;

