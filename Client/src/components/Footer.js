import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto pt-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="container pb-4">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p className="mb-2">
              <FaMapMarkerAlt className="me-2 text-primary" />
              13-15 The Avenue, Ferntree Gully VIC 3156
            </p>
            <p className="mb-2">
              <FaPhone className="me-2 text-primary" />
              03 9758 7859
            </p>
            <p className="mb-0">
              <FaEnvelope className="me-2 text-primary" />
              office@theavenueschool.vic.edu.au
            </p>
            <h6 className="fw-bold mt-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61576600509884" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="fs-5 text-white" />
              </a>
              <a href="https://www.instagram.com/theavenueschool/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="fs-5 text-white" />
              </a>
              <a href="https://www.linkedin.com/company/105613790/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="fs-5 text-white" />
              </a>
            </div>
          </div>

          {/* Right Column with Centered Heading and Two Link Columns */}
          <div className="col-md-6">
            <div className="text-center mb-3">
              <h6 className="fw-bold">Quick Links</h6>
            </div>
            <div className="row">
              <div className="col-6 text-end">
                <ul className="list-unstyled">
                  <li><Link to="/enrolments" className="text-white text-decoration-none d-block mb-1">Enrolments</Link></li>
                  <li><Link to="/curriculum" className="text-white text-decoration-none d-block mb-1">Curriculum</Link></li>
                  <li><Link to="/about" className="text-white text-decoration-none d-block mb-1">About Us</Link></li>
                  <li><Link to="/contact" className="text-white text-decoration-none d-block mb-1">Contact Us</Link></li>
                </ul>
              </div>
              <div className="col-6 text-start">
                <ul className="list-unstyled">
                  <li><Link to="/events" className="text-white text-decoration-none d-block mb-1">Events</Link></li>
                  <li><Link to="/careers" className="text-white text-decoration-none d-block mb-1">Careers</Link></li>
                  <li><Link to="/login" className="text-white text-decoration-none d-block mb-1">Login</Link></li>
                  <li><Link to="/documents" className="text-white text-decoration-none d-block mb-1">Documents</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-secondary text-center py-3">
        <small className="text-white">
          &copy; 2025 The Avenue School. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
