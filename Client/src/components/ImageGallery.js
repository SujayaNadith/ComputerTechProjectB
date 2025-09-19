import React from 'react';

const galleryImages = [
  { filename: 'gallery-1.jpg', caption: 'Student Wellbeing Corner' },
  { filename: 'gallery-2.jpg', caption: 'Creative Wall Art' },
  { filename: 'gallery-3.jpg', caption: 'The Lounge' },
  { filename: 'gallery-4.jpg', caption: 'Basketball Court' },
  { filename: 'gallery-5.jpg', caption: 'Driveway & Scenic View' },
  { filename: 'gallery-6.jpg', caption: 'Garden Area' },
  { filename: 'gallery-7.jpg', caption: 'Playground & Outdoor Space' }
];

const loopedImages = [...galleryImages, ...galleryImages];

/**
 * ImageGallery displays a looping, scrollable set of campus images. The array
 * is duplicated so users see a seamless stream when swiping on touch devices.
 */
const ImageGallery = () => {
  return (
    <section
      className="w-100 py-4"
      style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: '#e9e9e2' }}
    >
      <h2 className="fw-bold text-center mb-4" style={{ color: '#2b333d' }}>School Life</h2>
      <div
        className="d-flex overflow-auto gap-3 px-2"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'thin' }}
      >
        {loopedImages.map((img, i) => (
          <div
            key={i}
            className="rounded shadow-sm bg-white d-flex align-items-end justify-content-center hover-shadow flex-shrink-0"
            style={{
              height: '250px',
              width: '350px',
              // Images live in Client/src/assets/images/homepage
              backgroundImage: `url(${require(`../assets/images/homepage/${img.filename}`)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.3s ease',
              scrollSnapAlign: 'start'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="bg-dark bg-opacity-50 text-white w-100 text-center py-2">
              <small>{img.caption}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageGallery;
