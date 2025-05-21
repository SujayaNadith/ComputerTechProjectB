import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Events from './components/Events';
import Login from './components/Login';
import Register from './components/Register';
import Curriculum from './components/Curriculum';
import Enrolments from './components/Enrolments';
import ContactUs from './components/ContactUs';
import Documents from './components/Documents';
import Careers from './components/Careers';

import PrivateRoute from './utils/PrivateRoute';

import './App.css';
import './styles/themes.css';

function App() {

  return (
    <Router>
      <Header />
      <main style={{flex: 1}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enrolments" element={<Enrolments />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/careers" element={<Careers />} />

        <Route path="/documents" element={<Documents />} />
      </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
