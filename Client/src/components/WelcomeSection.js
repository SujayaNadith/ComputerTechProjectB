import React from 'react';
import { FaSchool } from 'react-icons/fa';

const WelcomeSection = () => {
  return (
    <section className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="text-center mb-4">
        <div className="d-inline-flex align-items-center gap-2 justify-content-center mb-2">
          <FaSchool className="text-primary" size={28} />
          <h2 className="fw-bold m-0" style={{ color: '#2b333d' }}>Welcome to Our School</h2>
        </div>
        <p className="lead" style={{ color: '#2b333d' }}>
          At The Avenue School, we believe in creating a nurturing environment where students can thrive academically,
          socially, and emotionally.
        </p>
      </div>

      <div className="bg-white p-4 shadow-sm rounded border-start border-4 border-primary">
        <h5 className="fw-bold text-primary mb-3">Acknowledgement of Country</h5>
        <p className="fst-italic" style={{ color: '#2b333d' }}>
          We acknowledge the Traditional Owners of the land on which we learn and grow, and pay our respects to Elders past,
          present, and emerging. We extend that respect to Aboriginal and Torres Strait Islander peoples who are part of our
          school community.
        </p>
      </div>
    </section>
  );
};

export default WelcomeSection;
