import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [enrolments, setEnrolments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [contactsRes, enrolmentsRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/contacts`),
        axios.get(`${process.env.REACT_APP_API_URL}/enrolments`)
      ]);
      setContacts(contactsRes.data);
      setEnrolments(enrolmentsRes.data);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/a7dash87/login`, {
        password: passwordInput
      });

      if (res.data.success) {
        setIsAdmin(true);
      }
    } catch (err) {
      alert('Incorrect password.');
    }
  };

  return (
    <Container className="my-5">
      {!isAdmin ? (
        <div className="text-center">
          <h3 className="mb-4">Admin Login</h3>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter admin password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <Button variant="primary" onClick={handleLogin}>Login</Button>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Admin Dashboard</h2>
            <Button variant="success" onClick={() => navigate('/a7dash87/create-event')}>
              + Add New Event
            </Button>
          </div>

          <h4 className="mt-4 mb-3">Enrolment Submissions</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {enrolments.map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4 className="mt-5 mb-3">Contact Messages</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, idx) => (
                <tr key={idx}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;
