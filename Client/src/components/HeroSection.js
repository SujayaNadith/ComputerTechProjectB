import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/homepage/hero-outdoors.jpg';
import './HeroSection.css';

/**
 * HeroSection pairs a branded backdrop with an embedded YouTube tour. A custom
 * fullscreen helper keeps the experience consistent across browsers.
 */
const HeroSection = () => {
  const wrapperRef = useRef(null);
  const iframeRef = useRef(null);

  // Cross-browser fullscreen helper
  const requestFs = (el) => {
    if (!el) return;
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (req) {
      try { req.call(el); } catch (e) { /* no-op */ }
    }
  };

  const openFullscreen = () => {
    // Prefer fullscreen on the wrapper so we control styling
    if (wrapperRef.current) return requestFs(wrapperRef.current);
    if (iframeRef.current) return requestFs(iframeRef.current);
  };

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
          <div
            ref={wrapperRef}
            className="video-thumb"
            style={{ maxWidth: '560px', width: '100%' }}
          >
            <div className="ratio ratio-16x9">
              <iframe
                ref={iframeRef}
                src="https://www.youtube.com/embed/UDyaAKTPti8?controls=1&rel=0&playsinline=1"
                title="Inside Our School"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <button className="video-expand-btn" aria-label="Enlarge video" onClick={(e) => { e.stopPropagation(); openFullscreen(); }}>
              ⤢
            </button>
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
