import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

/**
 * AdminInquiries aggregates enrolment form submissions and general contact
 * messages to let staff triage, annotate, or delete entries from a single view.
 */
const AdminInquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [enrolments, setEnrolments] = useState([]);
  const [saving, setSaving] = useState(null); // id being saved
  const navigate = useNavigate();

  useEffect(() => {
    // Load both collections concurrently so the tables hydrate together
    const fetchData = async () => {
      try {
        const [contactsRes, enrolmentsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/contacts`),
          axios.get(`${process.env.REACT_APP_API_URL}/enrolments`)
        ]);
        setContacts(contactsRes.data);
        setEnrolments(enrolmentsRes.data);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
      }
    };

    fetchData();
  }, []);

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
  ];

  const handleDeleteContact = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this inquiry?");
    if (!confirmed) return;

    console.log("Deleting contact with ID:", id);

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/contacts/${id}`);
      setContacts(prev => prev.filter(contact => contact._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete contact:", err);
      alert("Something went wrong while deleting the contact.");
    }
  };

  const saveContactMeta = async (id, adminStatus, adminNote) => {
    try {
      setSaving(id);
      const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/contacts/${id}`, { adminStatus, adminNote });
      setContacts(prev => prev.map(c => (c._id === id ? data : c)));
    } catch (err) {
      console.error('❌ Failed to update contact:', err);
      alert('Failed to save changes.');
    } finally {
      setSaving(null);
    }
  };

  const handleDeleteEnrolment = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this enrolment?");
    if (!confirmed) return;

    console.log("Deleting enrolment with ID:", id);

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/enrolments/${id}`);
      setEnrolments(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete enrolment:", err);
      alert("Something went wrong while deleting the enrolment.");
    }
  };

  const saveEnrolmentMeta = async (id, adminStatus, adminNote) => {
    try {
      setSaving(id);
      const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/enrolments/${id}`, { adminStatus, adminNote });
      setEnrolments(prev => prev.map(e => (e._id === id ? data : e)));
    } catch (err) {
      console.error('❌ Failed to update enrolment:', err);
      alert('Failed to save changes.');
    } finally {
      setSaving(null);
    }
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="link" className="text-decoration-none" onClick={() => navigate(-1)}>
          <FiArrowLeft className="me-1" /> Back
        </Button>
      </div>
      <h3 className="mb-4">Enrolment Submissions</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Status</th>
            <th>Note</th>
            <th>Save</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enrolments.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.message}</td>
              <td style={{ minWidth: 140 }}>
                <Form.Select
                  size="sm"
                  value={e.adminStatus || 'new'}
                  onChange={(ev) => setEnrolments(prev => prev.map(x => x._id === e._id ? { ...x, adminStatus: ev.target.value } : x))}
                >
                  {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </Form.Select>
              </td>
              <td style={{ minWidth: 220 }}>
                <Form.Control
                  size="sm"
                  placeholder="Add note..."
                  value={e.adminNote || ''}
                  onChange={(ev) => setEnrolments(prev => prev.map(x => x._id === e._id ? { ...x, adminNote: ev.target.value } : x))}
                />
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  disabled={saving === e._id}
                  onClick={() => saveEnrolmentMeta(e._id, e.adminStatus, e.adminNote)}
                >
                  {saving === e._id ? 'Saving...' : 'Save'}
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteEnrolment(e._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className="mt-5 mb-4">Contact Messages</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Status</th>
            <th>Note</th>
            <th>Save</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone || '-'}</td>
              <td>{contact.subject || '-'}</td>
              <td>{contact.message}</td>
              <td style={{ minWidth: 140 }}>
                <Form.Select
                  size="sm"
                  value={contact.adminStatus || 'new'}
                  onChange={(ev) => setContacts(prev => prev.map(x => x._id === contact._id ? { ...x, adminStatus: ev.target.value } : x))}
                >
                  {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </Form.Select>
              </td>
              <td style={{ minWidth: 220 }}>
                <Form.Control
                  size="sm"
                  placeholder="Add note..."
                  value={contact.adminNote || ''}
                  onChange={(ev) => setContacts(prev => prev.map(x => x._id === contact._id ? { ...x, adminNote: ev.target.value } : x))}
                />
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  disabled={saving === contact._id}
                  onClick={() => saveContactMeta(contact._id, contact.adminStatus, contact.adminNote)}
                >
                  {saving === contact._id ? 'Saving...' : 'Save'}
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteContact(contact._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminInquiries;
