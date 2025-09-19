import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Error403 shows when a user fails the lightweight admin password gate and
 * gives them an easy route back to the public site.
 */
const Error403 = () => {
  return (
    <div className="text-center py-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="display-1 text-warning fw-bold">403</h1>
      <h2 className="mb-3 text-dark">Access Forbidden</h2>
      <p className="text-muted">You don't have permission to view this page.</p>
      <Link to="/" className="btn btn-primary mt-3">Return to Homepage</Link>
    </div>
  );
};

export default Error403;
