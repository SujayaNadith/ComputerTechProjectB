import React from 'react';

import HeroSection from './HeroSection';
import WelcomeSection from './WelcomeSection';
import ImageGallery from './ImageGallery';
import ContentCards from './ContentCard';

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

      <div className="section-pale-sage py-5">
        <div className="container">
          <ContentCards />
        </div>
      </div>
    </>
  );
};

export default Home;
