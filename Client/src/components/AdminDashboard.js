import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiMail, FiLogOut, FiShield, FiBriefcase, FiUserPlus, FiServer } from 'react-icons/fi';

/**
 * AdminDashboard acts as the entry checkpoint for privileged features.
 * A successful password check persists a sessionStorage flag so child pages
 * can trust the same browser session without implementing full auth yet.
 */
const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('isAdmin') === '1');
  const [passwordInput, setPasswordInput] = useState(''); // plain text for now
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
      } else {
        navigate('/403');
      }
    } catch (err) {
      console.error(err);
      navigate('/403');
    }
  };

  useEffect(() => {
    if (isAdmin) sessionStorage.setItem('isAdmin', '1');
    else sessionStorage.removeItem('isAdmin');
  }, [isAdmin]);

  const handleLogout = () => {
    setIsAdmin(false);
    setPasswordInput('');
    navigate('/a7dash87');
  };

  return (
    <Container className="py-5">
      {!isAdmin ? (
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <FiShield size={28} className="text-primary me-2" />
                  <h4 className="mb-0">Admin Login</h4>
                </div>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter admin password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button type="submit" variant="primary">Login</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">Admin Dashboard</h2>
              <div className="text-muted">Manage events, inquiries, jobs, and interests</div>
            </div>
            <Button variant="outline-secondary" onClick={handleLogout}>
              <FiLogOut className="me-2" /> Logout
            </Button>
          </div>

          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-primary-subtle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                      <FiCalendar size={22} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="mb-0">Event Management</h5>
                      <small className="text-muted">Create, edit, or delete events</small>
                    </div>
                  </div>
                  <div className="mt-auto d-grid gap-2">
                    <Button variant="primary" onClick={() => navigate('/a7dash87/create-event')}>
                      Create New Event
                    </Button>
                    <Button variant="outline-primary" onClick={() => navigate('/events')}>
                      Manage Existing Events
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                      <FiServer size={22} className="text-secondary" />
                    </div>
                    <div>
                      <h5 className="mb-0">Services Used</h5>
                      <small className="text-muted">Track hosting & tools</small>
                    </div>
                  </div>
                  <div className="mt-auto d-grid">
                    <Button variant="secondary" onClick={() => navigate('/a7dash87/services-used')}>
                      View Services
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-info-subtle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                      <FiMail size={22} className="text-info" />
                    </div>
                    <div>
                      <h5 className="mb-0">View Inquiries</h5>
                      <small className="text-muted">Manage enrolments & messages</small>
                    </div>
                  </div>
                  <div className="mt-auto d-grid">
                    <Button variant="info" onClick={() => navigate('/a7dash87/inquiries')}>
                      Go to Inquiries
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-warning-subtle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                      <FiBriefcase size={22} className="text-warning" />
                    </div>
                    <div>
                      <h5 className="mb-0">Publish Job</h5>
                      <small className="text-muted">Post a new job opening</small>
                    </div>
                  </div>
                  <div className="mt-auto d-grid">
                    <Button variant="warning" onClick={() => navigate('/a7dash87/publish-jobs')}>
                      Open Job Publisher
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                      <FiUserPlus size={22} className="text-success" />
                    </div>
                    <div>
                      <h5 className="mb-0">See interests to work</h5>
                      <small className="text-muted">Review submitted interests & CVs</small>
                    </div>
                  </div>
                  <div className="mt-auto d-grid">
                    <Button variant="success" onClick={() => navigate('/a7dash87/interests')}>
                      View Interests
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;
