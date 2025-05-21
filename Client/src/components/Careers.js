import React, { useState } from 'react';
import '../styles/careers.css';

const Careers = () => {
  const [submitted, setSubmitted] = useState(false);

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
          <div className="table-responsive">
            <table className="table table-bordered align-middle text-center">
              <thead className="table-brand text-white">
                <tr>
                  <th>Position</th>
                  <th>Type</th>
                  <th>Closing Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Primary School Teacher</td>
                  <td>Full-Time</td>
                  <td>31 May 2025</td>
                </tr>
                <tr>
                  <td>School Receptionist</td>
                  <td>Part-Time</td>
                  <td>5 June 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
          <a href="#" className="btn btn-outline-brand mt-3">Download full position descriptions</a>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="h4 fw-bold text-brand mb-4">Apply Now</h2>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="fullname" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="fullname" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="position" className="form-label">Position Applying For</label>
              <select id="position" className="form-select" required>
                <option value="">-- Select a Position --</option>
                <option value="Primary School Teacher">Primary School Teacher</option>
                <option value="School Receptionist">School Receptionist</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="resume" className="form-label">Upload Resume (PDF)</label>
              <input type="file" className="form-control" id="resume" accept=".pdf" required />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-brand w-100">Submit Application</button>
              {submitted && <p className="text-success mt-3 fw-medium">Your application has been submitted!</p>}
            </div>
          </form>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h5 fw-bold text-brand mb-3">Staff Testimonial</h2>
          <blockquote className="blockquote text-muted">
            “Working at Avenue School is more than a job — it's a community.”<br />
            <footer className="blockquote-footer mt-2">Sarah, Year 2 Teacher</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default Careers;
