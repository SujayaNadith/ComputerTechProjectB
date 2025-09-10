import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert, ListGroup, Modal } from 'react-bootstrap';
import PdfCanvasViewer from './PdfCanvasViewer';
import { API_BASE } from '../lib/apiBase'; // ← unified env helper

const Enrolments = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // use API_BASE and new server mount
      await axios.post(
        `${API_BASE}/enrolments`,
        { name, email, message },
        { withCredentials: true } // in case you later set cookies/sessions
      );

      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('❌ Enrolment submit failed:', err);
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

  const [showViewer, setShowViewer] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null); // { name, file }

  const buildEncodedUrl = (path) => {
    if (!path) return '';
    const segments = path.split('/');
    const filename = segments.pop();
    const base = segments.join('/') || '';
    return `${base}/${encodeURIComponent(filename)}`;
  };

  const handleOpen = async (doc) => {
    const url = buildEncodedUrl(doc.file);
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) throw new Error('Not found');
      setActiveDoc(doc);
      setShowViewer(true);
    } catch (e) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleClose = () => {
    setShowViewer(false);
    setTimeout(() => setActiveDoc(null), 150);
  };

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
                    {enrolmentDocuments.map((doc, index) => {
                      const url = buildEncodedUrl(doc.file);
                      return (
                        <ListGroup.Item key={index}>
                          <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between align-items-start align-items-sm-center">
                            <Button
                              variant="link"
                              className="p-0 text-start fw-semibold"
                              onClick={() => handleOpen(doc)}
                            >
                              {doc.name}
                            </Button>
                            <div className="d-flex gap-2 w-100 w-sm-auto">
                              <Button
                                variant="primary"
                                className="flex-grow-1 flex-sm-grow-0"
                                onClick={() => handleOpen(doc)}
                              >
                                View
                              </Button>
                              <a
                                className="btn btn-outline-secondary flex-grow-1 flex-sm-grow-0"
                                href={url}
                                download
                              >
                                Download
                              </a>
                            </div>
                          </div>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                  <p className="mt-2 text-muted text-center">
                    Click a document to view or download.
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
      <Modal
        show={showViewer}
        onHide={handleClose}
        size="xl"
        centered
        fullscreen="md-down"
        aria-labelledby="enrolment-pdf-viewer-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="enrolment-pdf-viewer-title">{activeDoc?.name ?? 'Document'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 0 }}>
          {activeDoc ? (
            <div style={{ width: '100%', height: '80vh' }}>
              <PdfCanvasViewer fileUrl={buildEncodedUrl(activeDoc.file)} />
            </div>
          ) : (
            <div className="p-4">No document selected.</div>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column flex-sm-row gap-2 justify-content-between align-items-stretch align-items-sm-center">
          <small className="text-muted">Use your browser’s PDF toolbar to zoom/print.</small>
          <div className="d-flex gap-2 w-100 w-sm-auto">
            {activeDoc && (
              <>
                <a className="btn btn-outline-secondary flex-grow-1 flex-sm-grow-0" href={buildEncodedUrl(activeDoc.file)} target="_blank" rel="noopener noreferrer">
                  Open in new tab
                </a>
                <a className="btn btn-primary fw-semibold flex-grow-1 flex-sm-grow-0" href={buildEncodedUrl(activeDoc.file)} download>
                  Download
                </a>
              </>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Enrolments;
