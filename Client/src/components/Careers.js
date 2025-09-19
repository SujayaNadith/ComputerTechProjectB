import React, { useState } from 'react';
import '../styles/careers.css';
import CareerInterestForm from './CareerInterestForm';

/**
 * Careers landing page outlines perks, current vacancies (if any), and embeds
 * the interest registration form so prospective staff can lodge their details.
 */
const Careers = () => {
  const [submitted, setSubmitted] = useState(false); // placeholder for potential form reuse

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
  };

  return (
    <div className="careers-page">
      <section className="py-5 text-center bg-light border-bottom">
        <div className="container">
          <h1 className="display-5 fw-bold text-brand mb-3">Join Our Team at Avenue School</h1>
          <p className="lead text-muted">We're looking for passionate, dedicated professionals to help shape the future of our students.</p>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="h4 fw-bold text-brand mb-4">Why Work at Avenue School?</h2>
          <ul className="list-group list-group-flush shadow-sm rounded">
            <li className="list-group-item">Supportive, inclusive team environment</li>
            <li className="list-group-item">Modern teaching facilities</li>
            <li className="list-group-item">Opportunities for professional growth</li>
            <li className="list-group-item">Engaging school community</li>
          </ul>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h4 fw-bold text-brand mb-4">Current Job Openings</h2>
          <div className="alert alert-secondary text-center mb-0" role="alert">
            There are currently no job openings yet. Please check back later.
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="h4 fw-bold text-brand mb-3">Register Interest to Work</h2>
          <p className="text-muted mb-4">Not seeing a role yet? Share your details and the positions you’re interested in, and we’ll keep your CV on file.</p>
          <CareerInterestForm />
        </div>
      </section>
    </div>
  );
};

export default Careers;
