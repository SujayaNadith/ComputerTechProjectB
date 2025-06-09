import React from 'react';

import HeroSection from './HeroSection';
import WelcomeSection from './WelcomeSection';
import ImageGallery from './ImageGallery';

const Home = () => {
  return (
    <>
      <HeroSection />

      <div className="section-pale-sage py-5">
        <div className="container">
          <WelcomeSection />
        </div>
      </div>

      <div className="section-stone py-5">
        <div className="container">
          <ImageGallery />
        </div>
      </div>
    </>
  );
};

export default Home;
