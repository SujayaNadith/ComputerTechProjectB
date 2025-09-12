import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Events from './components/Events';
import Curriculum from './components/Curriculum';
import Enrolments from './components/Enrolments';
import ContactUs from './components/ContactUs';
import Documents from './components/Documents';
import Careers from './components/Careers'; 
import AdminDashboard from './components/AdminDashboard';
import CreateEvent from './components/createEvent';
import EditEvent from './components/editEvent';
import AdminInquiries from './components/AdminInquiries';
import AdminUpdates from './components/AdminUpdates';
import RouteBackground from './components/RouteBackground';
import ServicesUsed from './components/ServicesUsed';
import PublishJobs from './components/publishJobs';
import AdminInterests from './components/AdminInterests';

import Error404 from './components/Error404';
import Error403 from './components/Error403';

import './App.css';
import './styles/themes.css';

function App() {

  return (
    <Router>
      <RouteBackground />
      <Header />
      <main style={{flex: 1}}>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/enrolments" element={<Enrolments />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/documents" element={<Documents />} />

        <Route path="/a7dash87" element={<AdminDashboard />} />
        <Route path="/a7dash87/create-event" element={<CreateEvent />} />
        <Route path="/a7dash87/edit-event/:id" element={<EditEvent />} />
        <Route path="/a7dash87/inquiries" element={<AdminInquiries />} />
        <Route path="/a7dash87/updates" element={<AdminUpdates />} />
        <Route path="/a7dash87/services-used" element={<ServicesUsed />} />
        <Route path="/a7dash87/publish-jobs" element={<PublishJobs />} />
        <Route path="/a7dash87/interests" element={<AdminInterests />} />

        <Route path='*' element={<Error404 />} />
        <Route path='/403' element={<Error403 />} />

      </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
