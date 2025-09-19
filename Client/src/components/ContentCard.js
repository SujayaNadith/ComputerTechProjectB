import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ContentCards provides three quick navigation tiles for core sections of the
 * site. Replace the placeholder imagery once final photography is available.
 */
const ContentCards = () => {
  return (
    <section className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm hover-shadow">
            {/* Replace placeholder images with approved photography */}
            <img src="https://via.placeholder.com/400x320" alt="Our Programs" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title text-primary fw-bold">Our Programs</h5>
              <p className="small" style={{ color: '#2b333d' }}>Curriculum pathways and support for individual success.</p>
              <Link to="/curriculum" className="btn btn-outline-primary w-100 fw-semibold">Learn More</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm hover-shadow">
            <img src="https://via.placeholder.com/400x320" alt="School Community" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title text-primary fw-bold">Our Community</h5>
              <p className="small" style={{ color: '#2b333d' }}>Events, families, and inclusive engagement throughout the year.</p>
              <Link to="/about" className="btn btn-outline-primary w-100 fw-semibold">Learn More</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm hover-shadow">
            <img src="https://via.placeholder.com/400x320" alt="Latest News" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title text-primary fw-bold">Latest News</h5>
              <p className="small" style={{ color: '#2b333d' }}>Stay updated with events, achievements and announcements.</p>
              <Link to="/events" className="btn btn-outline-primary w-100 fw-semibold">View All</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentCards;
