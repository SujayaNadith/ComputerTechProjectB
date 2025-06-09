import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/homepage/hero-outdoors.jpg';

const HeroSection = () => {
  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{
        height: '75vh',
        backgroundImage: `linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      <div className="container text-center">
        <h1 className="display-4 fw-bold mb-3" style={{ color: '#2b333d' }}>
          Welcome to The Avenue School
        </h1>
        <p className="lead mx-auto" style={{ maxWidth: '700px', color: '#2b333d' }}>
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
