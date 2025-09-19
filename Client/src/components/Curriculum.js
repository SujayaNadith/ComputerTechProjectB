import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { FaGraduationCap, FaRoute } from 'react-icons/fa';

/**
 * Curriculum outlines the school's learning pathways and presents FAQs so
 * prospective students can understand the Victorian Pathways Certificate.
 */
function Curriculum() {
  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif' }}>

      {/* Overview and key pathways */}
      <div className="section-pale-sage py-5">
        <Container>
          <h2 className="text-center mb-4 fw-bold display-5" style={{ color: '#2b333d' }}>
            Our Curriculum
          </h2>
          <p className="text-center text-muted lead mb-5">
            Learn more about our inclusive and flexible education pathways tailored to student needs.
          </p>

          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 shadow-sm border-0 hover-shadow">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center gap-2 mb-3 text-info fw-semibold">
                    <FaGraduationCap size={26} />
                    <span>The Victorian Pathways Certificate (VPC)</span>
                  </Card.Title>
                  <ul style={{ color: '#2b333d' }}>
                    <li>Inclusive and flexible option for completing Secondary Education.</li>
                    <li>For students not yet ready for VCE or VCE VM.</li>
                    <li>Can begin earlier than Year 11 or extend beyond two years.</li>
                    <li>Focuses on practical, classroom-based assessment.</li>
                    <li>Designed collaboratively with students, families, and staff.</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="h-100 shadow-sm border-0 hover-shadow">
                <Card.Body>
                  <Card.Title className="d-flex align-items-center gap-2 mb-3 text-warning fw-semibold">
                    <FaRoute size={26} />
                    <span>Pathways from the VPC</span>
                  </Card.Title>
                  <ul style={{ color: '#2b333d' }}>
                    <li>Transition to VCE or VCE VM.</li>
                    <li>Entry-level VET programs at TAFE.</li>
                    <li>Apprenticeships and traineeships.</li>
                    <li>Direct entry into the workforce.</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* FAQ clarifies the certification */}
      <div className="section-stone py-5">
        <Container>
          <div className="card p-4 border-0 shadow-sm bg-white">
            <h3 className="mb-4 text-center" style={{ color: '#4d316c' }}>
              Frequently Asked Questions
            </h3>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>What is the Victorian Pathways Certificate (VPC)?</Accordion.Header>
                <Accordion.Body style={{ color: '#2b333d' }}>
                  The VPC is a flexible secondary school certificate designed for students who are not ready or able to complete the VCE or VCE VM. It emphasizes practical, hands-on learning.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Who is eligible for the VPC?</Accordion.Header>
                <Accordion.Body style={{ color: '#2b333d' }}>
                  Students who require a more accessible learning path due to personal, academic, or other challenges. The school collaborates with families to determine suitability.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>What are the future pathways after completing the VPC?</Accordion.Header>
                <Accordion.Body style={{ color: '#2b333d' }}>
                  Graduates can transition to VCE, VCE VM, TAFE, apprenticeships, or directly enter the workforce, depending on their goals and readiness.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>How long does it take to complete the VPC?</Accordion.Header>
                <Accordion.Body style={{ color: '#2b333d' }}>
                  Typically 2 years (Years 11–12), but it can start earlier or be extended, based on the individual student’s needs.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Container>
      </div>
      
    </div>
  );
}

export default Curriculum;
