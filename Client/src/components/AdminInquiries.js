import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';

const AdminInquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [enrolments, setEnrolments] = useState([]);

  useEffect(() => {
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

  return (
    <Container className="my-5">
      <h3 className="mb-4">Enrolment Submissions</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enrolments.map((e, idx) => (
            <tr key={idx}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.message}</td>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, idx) => (
            <tr key={idx}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone || '-'}</td>
              <td>{contact.subject || '-'}</td>
              <td>{contact.message}</td>
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
