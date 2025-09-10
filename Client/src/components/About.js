import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBullseye, FaEye } from 'react-icons/fa';
import Principal from '../assets/images/staff/jarrid.jpg';
import '../styles/about.css';

const About = () => {
  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      <div className="section-pale-sage py-5">
        <Container>
          <h2 className="text-center fw-bold mb-3 display-5" style={{ color: '#2b333d' }}>
            Our Mission & Vision
          </h2>
          <p className="text-center text-muted lead mb-5">
            Discover our purpose, guiding values, and the people who lead our vision forward.
          </p>

          <Row className="mb-5 g-4 justify-content-center">
            <Col md={6}>
              <Card className="shadow-lg border-0 h-100 p-3 hover-shadow">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '45px', height: '45px' }}>
                      <FaEye />
                    </div>
                    <h5 className="mb-0 fw-bold text-primary">Our Vision</h5>
                  </div>
                  <Card.Text style={{ color: '#2b333d' }}>
                    To create an inclusive learning environment where young people can access a Senior Secondary education pathway.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-lg border-0 h-100 p-3 hover-shadow">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '45px', height: '45px' }}>
                      <FaBullseye />
                    </div>
                    <h5 className="mb-0 fw-bold text-primary">Mission Statement</h5>
                  </div>
                  <Card.Text style={{ color: '#2b333d' }}>
                    The Avenue School recognises the rights of all young people. It is committed to creating an inclusive and supportive learning environment, where young people feel safe and can engage in their educational journey with confidence.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section-stone py-5">
        <Container>
          <h3 className="text-center fw-bold mb-4" style={{ color: '#4d316c' }}>Our Values</h3>
          <ul className="list-group list-group-flush shadow-sm bg-white rounded p-4" style={{ color: '#2b333d' }}>
            <li className="list-group-item">Our School is safe for everyone.</li>
            <li className="list-group-item">We celebrate diversity and are inclusive.</li>
            <li className="list-group-item">We are open minded, curious and accepting.</li>
            <li className="list-group-item">We demonstrate empathy, are compassionate and act with kindness.</li>
            <li className="list-group-item">We have respect for each other, our environment and ourselves.</li>
            <li className="list-group-item">We are honest and trusted by our people and our community.</li>
            <li className="list-group-item">We nurture courage in all its forms.</li>
          </ul>
        </Container>
      </div>

      <div className="section-pale-sage py-5">
        <Container>
          <h3 className="text-center fw-bold mb-4" style={{ color: '#1a351a' }}>Our Philosophy</h3>
          <ul className="list-group list-group-flush shadow-sm bg-white rounded p-4" style={{ color: '#2b333d' }}>
            <li className="list-group-item">
              Believes in equal opportunities for all students, regardless of their life circumstances.
            </li>
            <li className="list-group-item">
              Respects and values the uniqueness of every student and affirms their right to access education in an environment that fosters belonging and empowerment and is conducive to their success.
            </li>
            <li className="list-group-item">
              Provides flexible and personalised pathways for learning by nurturing skills, knowledge, and self-assurance and by respecting individual learning styles, interests and aspirations.
            </li>
            <li className="list-group-item">
              Fosters students’ intrinsic motivation to learn, by ensuring learning is student focused and encouraging students to explore and embrace learning pathways that take them towards their individual goals.
            </li>
            <li className="list-group-item">
              Prioritises the holistic development of students by offering comprehensive support for their social and emotional growth.
            </li>
            <li className="list-group-item">
              Respects partners and related entities by working constructively and collaboratively together, operating responsibly, honestly and with accountability and ensuring our students are the focus of all our endeavours.
            </li>
          </ul>
        </Container>
      </div>

      <div className="section-stone py-5">
        <Container>
          <h3 className="text-center fw-bold mb-4" style={{ color: '#2b333d' }}>Our Leadership Team</h3>
          <Row className="justify-content-center">
            <Col md={6} lg={4}>
              <Card className="h-100 shadow-sm hover-shadow">
                <div className="crop-bottom-half">
                  <Card.Img
                    variant="top"
                    src={Principal}
                    alt="Jarrid Bartle"
                    className="cropped-img"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-center fw-bold" style={{ color: '#2b333d' }}>Jarrid Bartle</Card.Title>
                  <p className="text-primary text-center fw-medium mb-2">Principal</p>
                  <p className="text-muted text-center">
                    “Every student deserves a space where they feel safe, seen and supported; at The Avenue School, we don’t just teach, we empower young people to rediscover their confidence and reimagine their future.”
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default About;
