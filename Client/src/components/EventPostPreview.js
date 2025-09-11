import React, { useMemo } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import moment from 'moment';

// Events-only live preview that mirrors the feed card layout.
// Accepts File[] via `files` and optional url[] via `imageUrls`.
const EventPostPreview = ({ title, date, description, files = [], imageUrls = [] }) => {
  const urls = useMemo(() => {
    const localUrls = (files || []).map(f => URL.createObjectURL(f));
    return [...localUrls, ...(imageUrls || [])];
  }, [files, imageUrls]);

  const prettyDate = date ? moment(date).format('MMM D, YYYY') : 'yyyy-mm-dd';

  return (
    <Card className="shadow-sm border-0" style={{ maxWidth: 720, margin: '0 auto' }}>
      <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
        <div>
          <div className="fw-bold" style={{ color: '#2b333d' }}>{title || 'Event title'}</div>
          <small className="text-muted">{prettyDate}</small>
        </div>
      </Card.Header>

      {urls.length > 0 && (
        <Carousel interval={null} indicators={urls.length > 1}>
          {urls.map((url, idx) => (
            <Carousel.Item key={idx}>
              <div style={{ width: '100%', paddingTop: '66%', position: 'relative', backgroundColor: '#f5f5f5' }}>
                <img src={url} alt={`preview-${idx}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <Card.Body>
        <Card.Text style={{ color: '#2b333d', whiteSpace: 'pre-wrap' }}>
          {description || 'Event description...'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EventPostPreview;

