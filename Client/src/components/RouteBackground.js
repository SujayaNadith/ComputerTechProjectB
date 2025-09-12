import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Maps paths to gallery background images
const bgMap = [
  { test: (p) => p.startsWith('/enrolments'), file: 'gallery-1.jpg' },
  { test: (p) => p.startsWith('/curriculum'), file: 'gallery-2.jpg' },
  { test: (p) => p.startsWith('/about'), file: 'gallery-3.jpg' },
  { test: (p) => p.startsWith('/contact'), file: 'gallery-4.jpg' },
  { test: (p) => p.startsWith('/events'), file: 'gallery-5.jpg' },
  { test: (p) => p.startsWith('/careers'), file: 'gallery-6.jpg' },
  { test: (p) => p.startsWith('/documents'), file: 'gallery-7.jpg' },
];

const RouteBackground = () => {
  const { pathname } = useLocation();

  // Determine if a background should be shown and resolve its src
  let file = null;
  if (!(pathname === '/' || pathname.startsWith('/a7dash87'))) {
    const match = bgMap.find(({ test }) => test(pathname));
    if (match) file = match.file;
  }

  let src = null;
  if (file) {
    try {
      src = require(`../assets/images/homepage/${file}`);
    } catch {
      src = null;
    }
  }

  const hasBg = Boolean(src);

  // Always call hooks; toggle class based on whether a bg is active
  useEffect(() => {
    if (hasBg) document.body.classList.add('has-route-bg');
    else document.body.classList.remove('has-route-bg');
    return () => document.body.classList.remove('has-route-bg');
  }, [hasBg, pathname]);

  if (!hasBg) return null;

  const style = {
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return <div aria-hidden="true" style={style} />;
};

export default RouteBackground;
