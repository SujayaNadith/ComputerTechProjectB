import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col, Image, Spinner } from 'react-bootstrap';
import { FiArrowLeft, FiCalendar, FiImage, FiTrash2 } from 'react-icons/fi';
import { API_BASE } from '../lib/apiBase';

/**
 * EditEvent preloads an existing event by id, allowing staff to adjust copy,
 * manage which hosted images to retain, and upload replacements in one pass.
 */
const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({ title: '', date: '', description: '' });
  const [existingImages, setExistingImages] = useState([]); // string URLs retained
  const [newFiles, setNewFiles] = useState([]); // File[]

  useEffect(() => {
    let alive = true;
    (async () => {
      // Fetch existing record so the form can be pre-populated
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

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('date', formData.date);
      fd.append('description', formData.description);
      // Send the list of images the admin chose to keep so the API can delete the rest
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
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex align-items-center gap-2"><FiImage /> Add Images</Form.Label>
                  {/* File input feeds a client-side preview before we append to FormData */}
                  <Form.Control type="file" accept="image/png,image/jpeg,image/jpg,image/webp" multiple onChange={(e) => setNewFiles(Array.from(e.target.files || []))} />
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {newFiles.map((f, i) => (
                      // Temporary previews for newly selected files
                      <Image key={i} src={URL.createObjectURL(f)} alt={`new-${i}`} thumbnail style={{ width: 96, height: 96, objectFit: 'cover' }} />
                    ))}
                  </div>
                </Form.Group>
                <div className="d-grid">
                  <Button type="submit" variant="success" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                </div>
              </Form>
            </Col>
            <Col md={5} className="mt-4 mt-md-0">
              <div className="p-3 border rounded-3 bg-light h-100">
                <h6 className="mb-3">Existing Images</h6>
                {existingImages.length === 0 && <div className="text-muted">No images</div>}
                <div className="d-flex flex-wrap gap-2">
                  {existingImages.map((url) => (
                    <div key={url} className="position-relative">
                      <Image src={url} alt="existing" thumbnail style={{ width: 96, height: 96, objectFit: 'cover' }} />
                      <Button size="sm" variant="danger" className="position-absolute top-0 end-0 p-1" onClick={() => removeExisting(url)} aria-label="Remove image">
                        <FiTrash2 />
                      </Button>
                    </div>
                  ))}
                </div>
                {/* Give staff a reminder about how the retention flow works */}
                {existingImages.length > 0 && (
                  <div className="mt-3 p-2 bg-white rounded border">
                    <small className="text-muted">
                      <strong>Note:</strong> Removing an existing image here deletes it once the form is saved.
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
