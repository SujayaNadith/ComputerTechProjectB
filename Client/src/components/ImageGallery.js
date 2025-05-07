import React from 'react';

const ImageGallery = () => {
  return (
    <section className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <h2 className="fw-bold text-center mb-4" style={{ color: '#2b333d' }}>School Life</h2>
      <div className="d-flex overflow-auto gap-3 pb-3 px-1">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="rounded shadow-sm bg-white d-flex align-items-end justify-content-center hover-shadow"
            style={{
              height: '200px',
              minWidth: '280px',
              objectFit: 'cover',
              backgroundImage: `url(https://via.placeholder.com/400x320?text=Image+${i + 1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div className="bg-dark bg-opacity-50 text-white w-100 text-center py-2">
              <small>Image {i + 1}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageGallery;
