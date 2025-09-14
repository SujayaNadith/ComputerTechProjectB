import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ButtonGroup, Spinner, Alert, Carousel, Badge, Row, Col, Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';
import axios from 'axios';
import { FiCalendar, FiClock, FiEdit3, FiTrash2, FiImage, FiArrowRight, FiX } from 'react-icons/fi';
import { API_BASE } from '../lib/apiBase';

const Events = () => {
  const [view, setView] = useState('upcoming');
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const upcomingEvents = allEvents
    .filter(event => moment(event.date).isSameOrAfter(today, 'day'))
    .sort((a, b) => moment(a.date).diff(moment(b.date)));

  const pastEvents = allEvents
    .filter(event => moment(event.date).isBefore(today, 'day'))
    .sort((a, b) => moment(b.date).diff(moment(a.date)));

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const getEventStatus = (eventDate) => {
    const today = moment();
    const eventMoment = moment(eventDate);
    const daysDiff = eventMoment.diff(today, 'days');
    
    if (daysDiff < 0) return { status: 'past', label: 'Past Event', variant: 'secondary' };
    if (daysDiff === 0) return { status: 'today', label: 'Today', variant: 'danger' };
    if (daysDiff <= 7) return { status: 'soon', label: 'This Week', variant: 'warning' };
    return { status: 'upcoming', label: 'Upcoming', variant: 'success' };
  };

  const renderEvents = (events) => (
    <Row className="g-4">
      {events.map((event, index) => {
        const eventStatus = getEventStatus(event.date);
        const isUpcoming = view === 'upcoming';
        
        return (
          <Col key={event._id || `${event.title}-${event.date}`} lg={6} xl={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-100 shadow-sm border-0 event-card" style={{ 
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }}>
                {/* Event Status Badge */}
                <div className="position-absolute top-0 end-0 m-3" style={{ zIndex: 10 }}>
                  <Badge 
                    bg={eventStatus.variant} 
                    className="px-3 py-2"
                    style={{ 
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {eventStatus.label}
                  </Badge>
          </div>

                {/* Admin Actions */}
          {sessionStorage.getItem('isAdmin') === '1' && (
                  <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 10 }}>
                    <div className="d-flex gap-1">
                      <Button 
                        size="sm" 
                        variant="light" 
                        className="rounded-circle p-2 shadow-sm"
                        onClick={() => window.location.assign(`/a7dash87/edit-event/${event._id}`)}
                        style={{ width: '36px', height: '36px' }}
                      >
                        <FiEdit3 size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="light" 
                        className="rounded-circle p-2 shadow-sm"
                        onClick={async () => {
                if (!window.confirm('Delete this event?')) return;
                try {
                  await axios.delete(`${API_BASE}/events/${event._id}`);
                  setAllEvents(prev => prev.filter(e => e._id !== event._id));
                } catch (e) {
                  alert('Failed to delete event');
                }
                        }}
                        style={{ width: '36px', height: '36px' }}
                      >
                        <FiTrash2 size={14} />
                      </Button>
                    </div>
            </div>
          )}

                {/* Event Images */}
                {Array.isArray(event.images) && event.images.length > 0 ? (
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <Carousel 
                      interval={null} 
                      indicators={event.images.length > 1}
                      controls={event.images.length > 1}
                      className="h-100"
                    >
            {event.images.map((url, idx) => (
                        <Carousel.Item key={idx} className="h-100">
                  <img
                    src={url}
                            alt={`${event.title} - ${idx + 1}`}
                            className="w-100 h-100"
                            style={{ 
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                          />
              </Carousel.Item>
            ))}
          </Carousel>
                    <div className="position-absolute bottom-0 start-0 m-2">
                      <Badge bg="dark" className="px-2 py-1">
                        <FiImage size={12} className="me-1" />
                        {event.images.length}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div 
                    style={{ 
                      height: '200px', 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    <div className="text-center">
                      <FiCalendar size={48} className="mb-2" />
                      <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>No Images</div>
                    </div>
                  </div>
                )}

                {/* Event Content */}
                <Card.Body className="p-4 d-flex flex-column">
                  {/* Event Title */}
                  <h5 className="fw-bold mb-2" style={{ 
                    color: '#2b333d',
                    fontSize: '1.25rem',
                    lineHeight: '1.3',
                    minHeight: '2.6rem'
                  }}>
                    {event.title}
                  </h5>

                  {/* Event Date */}
                  <div className="d-flex align-items-center mb-3" style={{ color: '#6c757d' }}>
                    <FiCalendar size={16} className="me-2" />
                    <span className="fw-medium">
                      {moment(event.date).format('MMMM D, YYYY')}
                    </span>
                  </div>

                  {/* Event Description */}
                  <div 
                    className="flex-grow-1 mb-3"
                    style={{ 
                      color: '#495057',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {event.description}
                  </div>

                  {/* Event Footer */}
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center" style={{ color: '#6c757d', fontSize: '0.85rem' }}>
                      <FiClock size={14} className="me-1" />
                      <span>
                        {isUpcoming 
                          ? `${moment(event.date).diff(moment(), 'days')} days away`
                          : `${moment().diff(moment(event.date), 'days')} days ago`
                        }
                      </span>
                    </div>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      className="rounded-pill px-3"
                      style={{ fontSize: '0.8rem' }}
                      onClick={() => handleViewDetails(event)}
                    >
                      View Details <FiArrowRight size={12} className="ms-1" />
                    </Button>
                  </div>
        </Card.Body>
      </Card>
            </motion.div>
          </Col>
        );
      })}
    </Row>
  );

  const EmptyUpcoming = () => (
    <motion.div 
      className="text-center py-5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '24px',
          padding: '4rem 2rem',
          maxWidth: '500px',
          margin: '0 auto',
          color: 'white',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
        }}
      >
        <motion.div 
          style={{ fontSize: '5rem', marginBottom: '1.5rem' }}
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          📅
        </motion.div>
        <h3 style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '1.8rem' }}>
          You're Right On Time!
        </h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', opacity: 0.9 }}>
          No upcoming events scheduled yet.
        </p>
        <p style={{ fontSize: '1rem', opacity: 0.7 }}>
          Check back soon for exciting school events!
        </p>
      </div>
    </motion.div>
  );

  const EmptyPast = () => (
    <motion.div 
      className="text-center py-5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '24px',
          padding: '4rem 2rem',
          maxWidth: '500px',
          margin: '0 auto',
          color: 'white',
          boxShadow: '0 20px 40px rgba(240, 147, 251, 0.3)',
        }}
      >
        <motion.div 
          style={{ fontSize: '5rem', marginBottom: '1.5rem' }}
          animate={{ 
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          🎉
        </motion.div>
        <h3 style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '1.8rem' }}>
          No Past Events Yet
        </h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', opacity: 0.9 }}>
          This is where past events will appear.
        </p>
        <p style={{ fontSize: '1rem', opacity: 0.7 }}>
          Start creating events to build your school's history!
        </p>
    </div>
    </motion.div>
  );

  return (
    <>
      <style>
        {`
          .event-card {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          
          .event-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
          }
          
          .event-card .card-body {
            transition: all 0.3s ease;
          }
          
          .event-card:hover .card-body {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          }
          
          .carousel-control-prev,
          .carousel-control-next {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
            transition: all 0.3s ease;
          }
          
          .event-card:hover .carousel-control-prev,
          .event-card:hover .carousel-control-next {
            opacity: 1;
          }
          
          .carousel-indicators {
            bottom: 10px;
            margin-bottom: 0;
          }
          
          .carousel-indicators [data-bs-target] {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            border: none;
            margin: 0 4px;
          }
          
          .carousel-indicators .active {
            background-color: white;
          }
          
          @media (max-width: 768px) {
            .event-card:hover {
              transform: translateY(-4px);
            }
          }
        `}
      </style>
      <div style={{ 
        fontFamily: 'Montserrat, sans-serif',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh'
      }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 0 2rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        
        <Container className="position-relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="display-4 fw-bold mb-3" style={{ 
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              fontSize: '3.5rem'
            }}>
              School Events
            </h1>
            <p className="lead mb-4" style={{ 
              fontSize: '1.3rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover upcoming events and relive past memories from our school community
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Main Content */}
      <div style={{ padding: '3rem 0' }}>
        <Container>
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-5"
          >
            <div 
              className="d-inline-flex p-1 rounded-pill"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Button
                variant={view === 'upcoming' ? 'primary' : 'transparent'}
                className={`rounded-pill px-4 py-2 ${view === 'upcoming' ? 'shadow-sm' : ''}`}
                onClick={() => setView('upcoming')}
                style={{
                  border: 'none',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  color: view === 'upcoming' ? 'white' : '#6c757d'
                }}
              >
                <FiCalendar className="me-2" />
              Upcoming Events
                {upcomingEvents.length > 0 && (
                  <Badge bg="light" text="dark" className="ms-2">
                    {upcomingEvents.length}
                  </Badge>
                )}
            </Button>
            <Button
                variant={view === 'past' ? 'primary' : 'transparent'}
                className={`rounded-pill px-4 py-2 ${view === 'past' ? 'shadow-sm' : ''}`}
              onClick={() => setView('past')}
                style={{
                  border: 'none',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  color: view === 'past' ? 'white' : '#6c757d'
                }}
              >
                <FiClock className="me-2" />
              Past Events
                {pastEvents.length > 0 && (
                  <Badge bg="light" text="dark" className="ms-2">
                    {pastEvents.length}
                  </Badge>
                )}
            </Button>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div 
              className="d-flex justify-content-center py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center">
                <Spinner 
                  animation="border" 
                  role="status" 
                  style={{ 
                    width: '3rem', 
                    height: '3rem',
                    color: '#667eea'
                  }} 
                />
                <div className="mt-3 text-muted">Loading events...</div>
            </div>
            </motion.div>
          )}

          {/* Error State */}
          {!loading && err && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Alert 
                variant="warning" 
                className="text-center border-0"
                style={{
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
                  color: '#2d3436',
                  fontSize: '1.1rem',
                  padding: '2rem'
                }}
              >
                <div className="h4 mb-2">⚠️ Oops!</div>
              {err}
            </Alert>
            </motion.div>
          )}

          {/* Events Content */}
          {!loading && !err && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {view === 'upcoming'
                    ? (upcomingEvents.length > 0 ? renderEvents(upcomingEvents) : <EmptyUpcoming />)
                    : (pastEvents.length > 0 ? renderEvents(pastEvents) : <EmptyPast />)}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </Container>
      </div>
      </div>

      {/* Event Details Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        size="lg" 
        centered
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        <Modal.Header 
          closeButton 
          style={{ 
            border: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Modal.Title className="fw-bold">
            <FiCalendar className="me-2" />
            Event Details
          </Modal.Title>
        </Modal.Header>
        
        {selectedEvent && (
          <Modal.Body style={{ padding: 0 }}>
            {/* Event Images */}
            {Array.isArray(selectedEvent.images) && selectedEvent.images.length > 0 && (
              <div style={{ height: '300px', overflow: 'hidden' }}>
                <Carousel 
                  interval={null} 
                  indicators={selectedEvent.images.length > 1}
                  controls={selectedEvent.images.length > 1}
                  className="h-100"
                >
                  {selectedEvent.images.map((url, idx) => (
                    <Carousel.Item key={idx} className="h-100">
                      <img
                        src={url}
                        alt={`${selectedEvent.title} - ${idx + 1}`}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            )}

            <div className="p-4">
              {/* Event Title */}
              <h3 className="fw-bold mb-3" style={{ color: '#2b333d' }}>
                {selectedEvent.title}
              </h3>

              {/* Event Date and Status */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center" style={{ color: '#6c757d' }}>
                  <FiCalendar size={20} className="me-2" />
                  <span className="fw-medium fs-5">
                    {moment(selectedEvent.date).format('dddd, MMMM D, YYYY')}
                  </span>
                </div>
                <Badge 
                  bg={getEventStatus(selectedEvent.date).variant} 
                  className="px-3 py-2"
                  style={{ 
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {getEventStatus(selectedEvent.date).label}
                </Badge>
              </div>

              {/* Event Description */}
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: '#495057' }}>Event Description</h5>
                <div 
                  style={{ 
                    color: '#495057',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    background: '#f8f9fa',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid #e9ecef'
                  }}
                >
                  {selectedEvent.description}
                </div>
              </div>

              {/* Event Info */}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center p-3" style={{ 
                    background: '#f8f9fa', 
                    borderRadius: '12px',
                    border: '1px solid #e9ecef'
                  }}>
                    <FiClock size={20} className="me-3 text-primary" />
                    <div>
                      <div className="fw-medium" style={{ color: '#495057' }}>Time Status</div>
                      <div className="text-muted">
                        {moment(selectedEvent.date).diff(moment(), 'days') >= 0
                          ? `${moment(selectedEvent.date).diff(moment(), 'days')} days away`
                          : `${moment().diff(moment(selectedEvent.date), 'days')} days ago`
                        }
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="d-flex align-items-center p-3" style={{ 
                    background: '#f8f9fa', 
                    borderRadius: '12px',
                    border: '1px solid #e9ecef'
                  }}>
                    <FiImage size={20} className="me-3 text-primary" />
                    <div>
                      <div className="fw-medium" style={{ color: '#495057' }}>Images</div>
                      <div className="text-muted">
                        {selectedEvent.images?.length || 0} photo{(selectedEvent.images?.length || 0) !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              {sessionStorage.getItem('isAdmin') === '1' && (
                <div className="mt-4 pt-3 border-top">
                  <h6 className="mb-3" style={{ color: '#495057' }}>Admin Actions</h6>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      onClick={() => {
                        handleCloseModal();
                        window.location.assign(`/a7dash87/edit-event/${selectedEvent._id}`);
                      }}
                    >
                      <FiEdit3 className="me-2" />
                      Edit Event
                    </Button>
                    <Button 
                      variant="outline-danger"
                      onClick={async () => {
                        if (!window.confirm('Are you sure you want to delete this event?')) return;
                        try {
                          await axios.delete(`${API_BASE}/events/${selectedEvent._id}`);
                          setAllEvents(prev => prev.filter(e => e._id !== selectedEvent._id));
                          handleCloseModal();
                        } catch (e) {
                          alert('Failed to delete event');
                        }
                      }}
                    >
                      <FiTrash2 className="me-2" />
                      Delete Event
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default Events;
