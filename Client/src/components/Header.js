import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import logo from '../assets/images/Logo.jpg';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-3">
          <img
            src={logo}
            alt="The Avenue School Logo"
            height="48"
            className="logo-animated d-inline-block align-middle"
            style={{ borderRadius: '6px' }}
          />
          <span className="fw-bold d-none d-md-inline" style={{ color: '#4d316c', fontFamily: 'Montserrat, sans-serif', fontSize: '1.25rem' }}>
            The Avenue School
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`
              }
              style={({ isActive }) => ({ color: isActive ? '#2b333d' : '#2b333d' })}
            >
              Home
            </NavLink>
            <NavLink
              to="/enrolments"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`
              }
              style={({ isActive }) => ({ color: isActive ? '#2b333d' : '#2b333d' })}
            >
              Enrolments
            </NavLink>
            <NavLink
              to="/curriculum"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`
              }
              style={({ isActive }) => ({ color: isActive ? '#2b333d' : '#2b333d' })}
            >
              Curriculum
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`
              }
              style={({ isActive }) => ({ color: isActive ? '#2b333d' : '#2b333d' })}
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`
              }
              style={({ isActive }) => ({ color: isActive ? '#2b333d' : '#2b333d' })}
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`
              }
              style={({ isActive }) => ({ color: isActive ? '#2b333d' : '#2b333d' })}
            >
              Events
            </NavLink>
            <NavLink
              to="/careers"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`
              }
              style={({ isActive }) => ({ color: isActive ? '#2b333d' : '#2b333d' })}
            >
              Careers
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ms-2 ${isActive ? 'active text-primary' : ''}`
              }
              style={{ color: '#2b333d' }}
            >
              <FaUserCircle size={22} />
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
