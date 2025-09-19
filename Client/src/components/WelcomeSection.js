import React from 'react';
import { FaSchool } from 'react-icons/fa';
import welcomeBg from '../assets/images/homepage/welcome-space.jpg'; 

/**
 * WelcomeSection reiterates the school's ethos and embeds the acknowledgement
 * of country within a branded, image-backed panel.
 */
const WelcomeSection = () => {
  return (
    <section
      className="py-5"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${welcomeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      <div className="container">
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center gap-2 justify-content-center mb-2">
            <FaSchool className="text-primary" size={28} />
            <h2 className="fw-bold m-0" style={{ color: '#2b333d' }}>
              Welcome to Our School
            </h2>
          </div>
          <p className="lead" style={{ color: '#2b333d', maxWidth: '800px', margin: '0 auto' }}>
            At The Avenue School, we believe in creating a nurturing environment where students can thrive
            academically, socially, and emotionally.
          </p>
        </div>

        <div className="bg-white p-4 shadow-sm rounded border-start border-4 border-primary" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h5 className="fw-bold text-primary mb-3">Acknowledgement of Country</h5>
          <p className="fst-italic" style={{ color: '#2b333d' }}>
            We acknowledge the Traditional Owners of the land on which we learn and grow, and pay our respects
            to Elders past, present, and emerging. We extend that respect to Aboriginal and Torres Strait
            Islander peoples who are part of our school community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
