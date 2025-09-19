import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ButtonGroup, Spinner, Alert, Carousel } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';
import axios from 'axios';
import { API_BASE } from '../lib/apiBase';

/**
 * Public Events feed splits results into upcoming and past groupings, animates
 * the toggle between them, and exposes admin-only edit/delete affordances when
 * the session storage flag is present.
 */
const Events = () => {
  const [view, setView] = useState('upcoming'); // which tab is active
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Fetch events once on mount so we can show them in both tabs
  useEffect(() => {
    let alive = true;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await axios.get(`${API_BASE}/events`, { withCredentials: true });
        if (!alive) return;
        setAllEvents(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        if (!alive) return;
        console.error('Error fetching events:', e);
        setErr('Unable to load events right now.');
      } finally {
        if (alive) setLoading(false);
      }
    };
    fetchEvents();
    return () => { alive = false; };
  }, []);

  const today = moment();

  // Separate future events so they appear under the Upcoming tab
  const upcomingEvents = allEvents
    .filter(event => moment(event.date).isSameOrAfter(today, 'day'))
    .sort((a, b) => moment(a.date).diff(moment(b.date)));

  const pastEvents = allEvents
    .filter(event => moment(event.date).isBefore(today, 'day'))
    .sort((a, b) => moment(b.date).diff(moment(a.date)));

  // Render helper keeps the card markup in one place for both views
  const renderEvents = (events) =>
    events.map((event) => (
      <Card key={event._id || `${event.title}-${event.date}`} className="mb-4 shadow-sm border-0" style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Header contains metadata plus admin tools */}
        <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
          <div>
            <div className="fw-bold" style={{ color: '#2b333d' }}>{event.title}</div>
            <small className="text-muted">{moment(event.date).format('MMM D, YYYY')}</small>
          </div>
          {/* Admin actions */}
          {sessionStorage.getItem('isAdmin') === '1' && (
            <div className="d-flex gap-2">
              <Button size="sm" variant="outline-secondary" onClick={() => window.location.assign(`/a7dash87/edit-event/${event._id}`)}>Edit</Button>
              <Button size="sm" variant="outline-danger" onClick={async () => {
                if (!window.confirm('Delete this event?')) return;
                try {
                  await axios.delete(`${API_BASE}/events/${event._id}`);
                  setAllEvents(prev => prev.filter(e => e._id !== event._id));
                } catch (e) {
                  alert('Failed to delete event');
                }
              }}>Delete</Button>
            </div>
          )}
        </Card.Header>

        {/* Media */}
        {Array.isArray(event.images) && event.images.length > 0 && (
          // Render a simple carousel when the event has uploaded images
          <Carousel interval={null} indicators={event.images.length > 1}>
            {event.images.map((url, idx) => (
              <Carousel.Item key={idx}>
                <div style={{ width: '100%', paddingTop: '66%', position: 'relative', backgroundColor: '#f5f5f5' }}>
                  <img
                    src={url}
                    alt={`event-${idx}`}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        {/* Caption */}
        <Card.Body>
          <Card.Text style={{ color: '#2b333d', whiteSpace: 'pre-wrap' }}>{event.description}</Card.Text>
        </Card.Body>
      </Card>
    ));

  const EmptyUpcoming = () => (
    <div className="text-center py-5">
      <div
        style={{
          backgroundColor: '#fef9f2',
          border: '2px dashed #fcd5ce',
          borderRadius: '16px',
          padding: '3rem 2rem',
          maxWidth: '620px',
          margin: '0 auto',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌈</div>
        <h4 style={{ color: '#4d316c', fontWeight: '600', marginBottom: '0.5rem' }}>
          You're right on time...
        </h4>
        <p style={{ color: '#555', fontSize: '1.1rem' }}>Nothing is planned yet.</p>
        <p style={{ color: '#777', fontSize: '1rem' }}>
          Check back later. We'll have something wonderful soon.
        </p>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Listing and filters share this wrapper */}
      <div className="section-pale-sage py-5">
        <Container>
          <h2 className="mb-4 text-center fw-bold display-5" style={{ color: '#2b333d' }}>
            Events
          </h2>

          <ButtonGroup className="d-flex justify-content-center mb-4">
            <Button
              variant={view === 'upcoming' ? 'primary' : 'outline-primary'}
              onClick={() => setView('upcoming')}
            >
              Upcoming Events
            </Button>
            <Button
              variant={view === 'past' ? 'primary' : 'outline-primary'}
              onClick={() => setView('past')}
            >
              Past Events
            </Button>
          </ButtonGroup>

          {loading && (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" role="status" />
            </div>
          )}

          {!loading && err && (
            <Alert variant="warning" className="text-center">
              {err}
            </Alert>
          )}

          {!loading && !err && (
            <div style={{ minHeight: '400px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ x: view === 'past' ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: view === 'past' ? -300 : 300, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Keep rendering logic identical for upcoming/past tabs */}
                  {view === 'upcoming'
                    ? (upcomingEvents.length > 0 ? renderEvents(upcomingEvents) : <EmptyUpcoming />)
                    : renderEvents(pastEvents)}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Events;
