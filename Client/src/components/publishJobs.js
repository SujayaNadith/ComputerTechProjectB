import React, { useMemo, useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBriefcase, FiFileText } from 'react-icons/fi';

/**
 * PublishJobs is a scaffolded form for future job postings; for now it validates
 * input locally and surfaces a preview, saving the final API integration for a
 * later sprint.
 */
const PublishJobs = () => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    type: 'Full-time',
    locationType: 'On-site',
    location: '',
    fte: '',
    closingDate: '',
    description: '',
    responsibilities: '',
    qualifications: '',
    benefits: '',
    salaryFrom: '',
    salaryTo: '',
    salaryCurrency: 'AUD',
    salaryPeriod: 'year',
    applicationMethod: 'email',
    applicationEmail: '',
    applicationUrl: '',
    contactName: '',
    contactEmail: '',
    tags: '',
    status: 'published',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const parsed = useMemo(() => {
    // Convert newline-delimited text areas into arrays for preview lists
    const toList = (s) => (s || '')
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    const toTags = (s) => (s || '')
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean);
    return {
      responsibilities: toList(formData.responsibilities),
      qualifications: toList(formData.qualifications),
      benefits: toList(formData.benefits),
      tags: toTags(formData.tags),
    };
  }, [formData.responsibilities, formData.qualifications, formData.benefits, formData.tags]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Basic validation
    if (!formData.title.trim()) return setError('Job title is required.');
    if (!formData.description.trim()) return setError('Job description is required.');
    if (formData.applicationMethod === 'email' && !formData.applicationEmail.trim()) {
      return setError('Application email is required.');
    }
    if (formData.applicationMethod === 'url' && !formData.applicationUrl.trim()) {
      return setError('Application URL is required.');
    }
    if (formData.salaryFrom && isNaN(Number(formData.salaryFrom))) return setError('Salary (from) must be a number.');
    if (formData.salaryTo && isNaN(Number(formData.salaryTo))) return setError('Salary (to) must be a number.');

    try {
      // TODO: Wire to API when ready (e.g., POST /jobs)
      // await axios.post(`${process.env.REACT_APP_API_URL}/jobs`, formData);
      // For now, simulate success without backend
      await new Promise(r => setTimeout(r, 300));
      setSuccess(true);
      setFormData({
        title: '',
        department: '',
        type: 'Full-time',
        locationType: 'On-site',
        location: '',
        fte: '',
        closingDate: '',
        description: '',
        responsibilities: '',
        qualifications: '',
        benefits: '',
        salaryFrom: '',
        salaryTo: '',
        salaryCurrency: 'AUD',
        salaryPeriod: 'year',
        applicationMethod: 'email',
        applicationEmail: '',
        applicationUrl: '',
        contactName: '',
        contactEmail: '',
        tags: '',
        status: 'published',
      });
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
                      <Form.Label>Department</Form.Label>
                      <Form.Control
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="e.g., Secondary, Primary, SEN"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select name="status" value={formData.status} onChange={handleChange}>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

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
                      <Form.Label>Work Arrangement</Form.Label>
                      <Form.Select name="locationType" value={formData.locationType} onChange={handleChange}>
                        <option>On-site</option>
                        <option>Hybrid</option>
                        <option>Remote</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
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
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>FTE / Hours</Form.Label>
                      <Form.Control
                        type="text"
                        name="fte"
                        value={formData.fte}
                        onChange={handleChange}
                        placeholder="e.g., 1.0 (full-time) or 0.6"
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

                <Row>
                  <Col md={7}>
                    <Form.Group className="mb-3">
                      <Form.Label>Salary Range</Form.Label>
                      <InputGroup>
                        <Form.Select name="salaryCurrency" value={formData.salaryCurrency} onChange={handleChange} style={{ maxWidth: 110 }}>
                          <option value="AUD">AUD</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                        </Form.Select>
                        <Form.Control
                          type="text"
                          name="salaryFrom"
                          value={formData.salaryFrom}
                          onChange={handleChange}
                          placeholder="From"
                        />
                        <Form.Control
                          type="text"
                          name="salaryTo"
                          value={formData.salaryTo}
                          onChange={handleChange}
                          placeholder="To"
                        />
                        <Form.Select name="salaryPeriod" value={formData.salaryPeriod} onChange={handleChange} style={{ maxWidth: 120 }}>
                          <option value="year">/year</option>
                          <option value="hour">/hour</option>
                        </Form.Select>
                      </InputGroup>
                      <Form.Text className="text-muted">Optional. Leave blank if not disclosed.</Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

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

                <Form.Group className="mb-3">
                  <Form.Label>Key Responsibilities</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="responsibilities"
                    rows={5}
                    value={formData.responsibilities}
                    onChange={handleChange}
                    placeholder={"One per line\n• Plan and deliver lessons\n• Monitor student progress"}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Qualifications & Experience</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="qualifications"
                    rows={5}
                    value={formData.qualifications}
                    onChange={handleChange}
                    placeholder={"One per line\n• Teaching qualification\n• VIT registration"}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Benefits</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="benefits"
                    rows={4}
                    value={formData.benefits}
                    onChange={handleChange}
                    placeholder={"One per line\n• Professional development\n• Supportive team"}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>How to Apply</Form.Label>
                      <Form.Select name="applicationMethod" value={formData.applicationMethod} onChange={handleChange}>
                        <option value="email">Email</option>
                        <option value="url">External URL</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {formData.applicationMethod === 'email' ? (
                      <Form.Group className="mb-3">
                        <Form.Label>Application Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="applicationEmail"
                          value={formData.applicationEmail}
                          onChange={handleChange}
                          placeholder="careers@school.example"
                        />
                      </Form.Group>
                    ) : (
                      <Form.Group className="mb-3">
                        <Form.Label>Application URL</Form.Label>
                        <Form.Control
                          type="url"
                          name="applicationUrl"
                          value={formData.applicationUrl}
                          onChange={handleChange}
                          placeholder="https://jobs.example.com/apply/123"
                        />
                      </Form.Group>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Person</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="e.g., HR Coordinator"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        placeholder="hr@school.example"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g., secondary, mathematics, leadership"
                  />
                  <Form.Text className="text-muted">Comma separated keywords.</Form.Text>
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="warning">{formData.status === 'draft' ? 'Save Draft' : 'Publish Job'}</Button>
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
                  {(formData.salaryFrom || formData.salaryTo) && (
                    <div className="mt-2">
                      Salary: {formData.salaryCurrency} {formData.salaryFrom || '?'} - {formData.salaryTo || '?'} / {formData.salaryPeriod}
                    </div>
                  )}
                  {parsed.responsibilities.length > 0 && (
                    <div className="mt-3">
                      <div className="fw-semibold">Key Responsibilities</div>
                      <ul className="mb-0">
                        {parsed.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  )}
                  {parsed.qualifications.length > 0 && (
                    <div className="mt-3">
                      <div className="fw-semibold">Qualifications & Experience</div>
                      <ul className="mb-0">
                        {parsed.qualifications.map((q, i) => <li key={i}>{q}</li>)}
                      </ul>
                    </div>
                  )}
                  {parsed.benefits.length > 0 && (
                    <div className="mt-3">
                      <div className="fw-semibold">Benefits</div>
                      <ul className="mb-0">
                        {parsed.benefits.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  )}
                  <div className="mt-2 text-muted small">
                    {formData.applicationMethod === 'email'
                      ? (formData.applicationEmail ? `Apply via email: ${formData.applicationEmail}` : 'Application via email')
                      : (formData.applicationUrl ? `Apply at: ${formData.applicationUrl}` : 'Application via external link')}
                  </div>
                  {parsed.tags.length > 0 && (
                    <div className="mt-2">
                      {parsed.tags.map((t, i) => (
                        <span key={i} className="badge bg-secondary me-1">{t}</span>
                      ))}
                    </div>
                  )}
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
