import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="text-center py-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="mb-3 text-dark">Page Not Found</h2>
      <p className="text-muted">The page you're looking for doesn't exist or was moved.</p>
      <Link to="/" className="btn btn-primary mt-3">Go Home</Link>
    </div>
  );
};

export default Error404;
