import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';

const updates = [
  { version: 'v1.0.2', date: '16 June 2025', details: 'Created admin updates & inquiries panel.' },
  { version: 'v1.0.1', date: '15 June 2025', details: 'Event creation system deployed.' },
  { version: 'v1.0.0', date: '14 June 2025', details: 'Initial website deployment with public pages and contact forms.' },
];

const AdminUpdates = () => {
  return (
    <Container className="my-5">
      <h3 className="mb-4">Website Update Log</h3>
      <ListGroup>
        {updates.map((log, idx) => (
          <ListGroup.Item key={idx}>
            <strong>{log.version}</strong> – <em>{log.date}</em><br />
            {log.details}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default AdminUpdates;
