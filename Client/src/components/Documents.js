import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Documents = () => {
  return (
    <div className="bg-light py-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Container>
        <h2 className="text-center fw-bold mb-4 display-5" style={{ color: '#2b333d' }}>
          School Policy Documents
        </h2>
        <p className="text-center text-muted mb-5">
          The following documents are available for public access. Backend functionality will be integrated to manage downloads.
        </p>

        <Row className="g-4">
          {[
            "Child Safety & Wellbeing",
            "Child Safety Responding & Reporting",
            "Child Safety Code of Conduct",
            "Anaphylaxis Management",
            "Student Welfare",
            "Student Attendance",
            "Care Arrangements for Ill Students",
            "First Aid",
            "Distribution of Medication",
            "Anti-Bullying and Harassment",
            "Supervision of Students",
            "Student Behaviour Management",
            "Off-site Activities, Excursions & Camps",
            "ICT Policy",
            "ICT Agreement",
            "Complaints Handling",
            "Critical Incident Management",
            "Online Safety",
            "Privacy",
            "Occupational Health & Safety",
            "Emergency Management Plan"
          ].map((doc, i) => (
            <Col md={6} lg={4} key={i}>
              <Card className="shadow-sm h-100 hover-shadow">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title className="fw-semibold fs-6" style={{ color: '#2b333d' }}>
                    {doc}
                  </Card.Title>
                  <Button variant="secondary" className="mt-3 w-100" disabled>
                    View Document
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Documents;
