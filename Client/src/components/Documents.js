import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const documentList = [
  { title: "Student Welfare", file: "Student-Welfare.pdf" },
  { title: "Anti-Bullying and Harassment", file: "Anti-Bullying and Harassment.pdf" },
  { title: "Supervision of Students", file: "Supervision of Students.pdf" },
  { title: "Off-site Activities, Excursions & Camps", file: "Off-site Activities, Excursio...mps.pdf" },
  { title: "Care Arrangements for Ill Students", file: "Care Arrange...ents.pdf" },
  { title: "First Aid", file: "First Aid.pdf" },
  { title: "Distribution of Medication", file: "Distribution of Medication.pdf" },
  { title: "ICT Agreement", file: "ICT Agreement.pdf" },
  { title: "ICT Policy", file: "ICT Policy.pdf" },
  { title: "Complaints Handling", file: "Complaints Handling.pdf" },
  { title: "Critical Incident Management", file: "Critical Incident Management.pdf" },
  { title: "Student Behaviour Management", file: "Student Behavio...ent.pdf" },
  { title: "Online Safety", file: "Online Safety.pdf" },
  { title: "Occupational Health & Safety", file: "Occupational Health...Safety.pdf" },
  { title: "Emergency Management Plan", file: "Emergency Manage...Plan.pdf" }, 
  { title: "Anaphylaxis Management", file: "Anapahalaxis Management.pdf" },
  { title: "Child Safety - Wellbeing", file: "Child Safety - Wellbeing.pdf" },
  { title: "Child Safety - Code of Conduct", file: "Child Safety - Code of Conduct.pdf" },
  { title: "Child Safety - Reporting and Responding", file: "Child Safety - Reporting and Responding.pdf" },
  { title: "Student Attendance", file: "Student Attendance.pdf" },
  { title: "Privacy", file: "Privacy.pdf" }
];

const Documents = () => {
  return (
    <div className="bg-light py-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Container>
        <h2 className="text-center fw-bold mb-4 display-5" style={{ color: '#2b333d' }}>
          School Policy Documents
        </h2>
        <p className="text-center text-muted mb-5">
          The following documents are available for public access and can be downloaded directly.
        </p>

        <Row className="g-4">
          {documentList.map((doc, i) => (
            <Col md={6} lg={4} key={i}>
              <Card className="shadow-sm h-100 hover-shadow">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title className="fw-semibold fs-6" style={{ color: '#2b333d' }}>
                    {doc.title}
                  </Card.Title>
                  <a
                    href={`/documents/${doc.file}`}
                    download
                    className="btn btn-primary mt-3 w-100"
                  >
                    Download
                  </a>
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
