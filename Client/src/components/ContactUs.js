import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaLinkedin} from 'react-icons/fa';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/contacts`, formData);
        setErrors({});
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } catch (err) {
        console.error("📛 Error submitting contact form:", err);
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      <div className="section-pale-sage py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" style={{ color: '#2b333d' }}>
            Contact Us
          </h2>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#2b333d' }}>Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.name}</div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#2b333d' }}>Email *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.email}</div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#2b333d' }}>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#2b333d' }}>Subject</label>
                      <select
                        className="form-select"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Support</option>
                        <option value="admission">Admission</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ color: '#2b333d' }}>Message *</label>
                      <textarea
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      <div className="invalid-feedback">{errors.message}</div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-semibold text-uppercase">
                      Submit
                    </button>

                    {submitted && (
                      <div className="alert alert-success mt-3 text-center">
                        Thank you! Your message has been sent.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="mb-3" style={{ color: '#2b333d' }}>School Address</h5>
                    <p className="mb-1"><FaMapMarkerAlt className="me-2 text-primary" />13-15 The Avenue, Ferntree Gully VIC 3156</p>
                    <p className="mb-1"><FaPhone className="me-2 text-primary" />03 9758 7859</p>
                    <p className="mb-3"><FaEnvelope className="me-2 text-primary" />office@theavenueschool.vic.edu.au</p>

                    <h6 style={{ color: '#2b333d' }}>Follow Us</h6>
                    <div className="d-flex gap-3">
                      <a href="https://www.facebook.com/profile.php?id=61576600509884"><FaFacebookF className="fs-4 text-primary" /></a>
                      <a href="https://www.linkedin.com/company/105613790/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="fs-4 text-primary" />
                      </a>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h6 className="mb-2" style={{ color: '#2b333d' }}>Location</h6>
                    <div className="ratio ratio-16x9 rounded overflow-hidden">
                      <iframe
                        title="School Location"
                        src="https://www.google.com/maps?q=13-15+The+Avenue,+Ferntree+Gully,+VIC,+Australia&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      

    </div>
  );
};

export default ContactUs;
