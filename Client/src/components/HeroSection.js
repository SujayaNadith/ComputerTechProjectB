import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section
      className="text-white text-center d-flex align-items-center justify-content-center position-relative fern-bg"
      style={{
        height: '75vh',
        backgroundImage: "linear-gradient(rgba(42, 42, 42, 0.6), rgba(42, 42, 42, 0.6)), url('https://via.placeholder.com/1600x500?text=School+Banner')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold mb-3" style={{ color: '#2b333d' }}>
          Welcome to The Avenue School
        </h1>
        <p className="lead mx-auto" style={{ maxWidth: '600px', color: '#2b333d' }}>
          Inspiring Excellence, Building Futures, and Nurturing Minds in Ferntree Gully
        </p>
        <Link
          to="/enrolments"
          className="btn btn-warning btn-lg mt-4 text-uppercase fw-bold shadow-sm"
        >
          Enrol Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
