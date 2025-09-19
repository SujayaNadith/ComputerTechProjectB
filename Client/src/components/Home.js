import React from 'react';

import HeroSection from './HeroSection';
import WelcomeSection from './WelcomeSection';
import ImageGallery from './ImageGallery';

/**
 * Home stitches together the hero video, welcome message, and rolling gallery
 * to provide a snapshot of the Avenue School experience.
 */
const Home = () => {
  return (
    <>
      {/* Hero video and CTA */}
      <HeroSection />

      {/* Welcome message backed by themed background */}
      <div className="section-pale-sage py-5">
        <div className="container">
          <WelcomeSection />
        </div>
      </div>

      {/* Gallery shows campus highlights */}
      <div className="section-stone py-5">
        <div className="container">
          <ImageGallery />
        </div>
      </div>
    </>
  );
};

export default Home;
