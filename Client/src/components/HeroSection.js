import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/homepage/hero-outdoors.jpg';

const HeroSection = () => {
  return (
    <section
      className="hero-section"
      style={{
        minHeight: '60vh', // smaller hero height
        backgroundImage: `linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        fontFamily: 'Montserrat, sans-serif',
        paddingTop: '4rem', // push content down slightly but keep it high on screen
        paddingBottom: '2rem'
      }}
    >
      <div className="container text-center">
        <h1 className="display-4 fw-bold mb-3" style={{ color: '#2b333d' }}>
          Welcome to The Avenue School
        </h1>
        <p className="lead mx-auto mb-3" style={{ maxWidth: '700px', color: '#2b333d' }}>
          Inspiring Excellence, Building Futures, and Nurturing Minds in Ferntree Gully
        </p>

        {/* 📹 Embedded YouTube Video */}
        <div className="d-flex justify-content-center mb-3">
          <div className="ratio ratio-16x9" style={{ maxWidth: '560px', width: '100%' }}>
            <iframe
              src="https://www.youtube.com/embed/UDyaAKTPti8"
              title="Inside Our School"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <Link
          to="/enrolments"
          className="btn btn-warning btn-lg text-uppercase fw-bold shadow-sm"
        >
          Enrol Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
