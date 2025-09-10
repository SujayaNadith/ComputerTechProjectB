import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
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

  return (
    <Container className="my-5">
      {!isAdmin ? (
        <div className="text-center">
          <h3 className="mb-4">Admin Login</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter admin password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <Button type="submit" variant="primary">Login</Button>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="mb-4">Welcome to the Admin Dashboard</h2>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button variant="success" onClick={() => navigate('/a7dash87/create-event')}>
              + Create Event
            </Button>
            <Button variant="info" onClick={() => navigate('/a7dash87/inquiries')}>
              📩 View Inquiries
            </Button>
            <Button variant="secondary" onClick={() => navigate('/a7dash87/updates')}>
              🛠 View Updates
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AdminDashboard;
