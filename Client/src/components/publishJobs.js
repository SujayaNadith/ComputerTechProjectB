import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBriefcase, FiFileText } from 'react-icons/fi';

const PublishJobs = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Full-time',
    location: '',
    closingDate: '',
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
      // TODO: Wire to API when ready (e.g., POST /jobs)
      // await axios.post(`${process.env.REACT_APP_API_URL}/jobs`, formData);
      // For now, simulate success without backend
      await new Promise(r => setTimeout(r, 300));
      setSuccess(true);
      setFormData({ title: '', type: 'Full-time', location: '', closingDate: '', description: '' });
    } catch (err) {
      console.error('Error publishing job:', err);
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
            <FiBriefcase className="text-warning me-2" /> Publish New Job
          </h4>
        </Card.Header>
        <Card.Body className="p-4">
          {success && <Alert variant="success">Job published (stub). Hook API next.</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Row>
            <Col md={7}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Mathematics Teacher"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Employment Type</Form.Label>
                      <Form.Select name="type" value={formData.type} onChange={handleChange}>
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Casual</option>
                        <option>Contract</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., Ferntree Gully, VIC"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Closing Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="closingDate"
                    value={formData.closingDate}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Role summary, responsibilities, qualifications..."
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="warning">Publish Job</Button>
                </div>
              </Form>
            </Col>

            <Col md={5} className="mt-4 mt-md-0">
              <div className="p-3 border rounded-3 bg-light h-100">
                <h6 className="mb-3 d-flex align-items-center">
                  <FiFileText className="me-2" /> Preview
                </h6>
                <div>
                  <div className="fw-bold">{formData.title || 'Job title'}</div>
                  <div className="text-muted mb-1">{formData.type} {formData.location ? `• ${formData.location}` : ''}</div>
                  <div className="text-muted mb-2">{formData.closingDate ? `Closes: ${formData.closingDate}` : 'No closing date set'}</div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{formData.description || 'Job description...'}</div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PublishJobs;

