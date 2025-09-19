import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api';

/**
 * CareerInterestForm collects optional title information, preferred roles, and
 * a CV upload which is converted to base64 so it can be persisted as binary in
 * MongoDB via the interests API.
 */
function CareerInterestForm() {
  const [title, setTitle] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [positions, setPositions] = useState([]);
  const [positionInput, setPositionInput] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const predefinedTitles = ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Other'];

  // Maintain a simple deduplicated array for positions of interest
  const addPosition = () => {
    const v = positionInput.trim();
    if (!v) return;
    if (!positions.includes(v)) setPositions([...positions, v]);
    setPositionInput('');
  };

  const removePosition = (p) => {
    setPositions(positions.filter(x => x !== p));
  };

  // Convert file uploads to data URLs before sending to the backend
  const readFileAsBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file); // data:...;base64,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError('First name and last name are required.');
      return;
    }
    if (!cvFile) {
      setError('Please upload your CV.');
      return;
    }

    try {
      setSubmitting(true);
      const base64 = await readFileAsBase64(cvFile);
      const payload = {
        title: title === 'Other' ? (customTitle || 'Other') : title,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        familyName: familyName.trim() || undefined,
        positions,
        cv: {
          filename: cvFile.name,
          mimetype: cvFile.type,
          base64,
        },
      };

      await axios.post(`${API_BASE}/interests`, payload, { withCredentials: true });
      setMessage('Thanks! Your interest has been submitted.');
      // reset form
      setTitle('');
      setCustomTitle('');
      setFirstName('');
      setLastName('');
      setFamilyName('');
      setPositions([]);
      setPositionInput('');
      setCvFile(null);
      if (e.target && e.target.reset) e.target.reset();
    } catch (err) {
      console.error('Error submitting interest:', err);
      setError(err?.response?.data?.error || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Register Interest to Work</h2>
      <p className="text-muted">Let us know your details and positions of interest.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Title</label>
            <select
              className="form-select"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select title</option>
              {predefinedTitles.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {title === 'Other' && (
            <div className="col-md-3">
              <label className="form-label">Custom Title</label>
              <input
                type="text"
                className="form-control"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g., Mx"
              />
            </div>
          )}

          <div className="col-md-3">
            <label className="form-label">First Name *</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Family Name (if applicable)</label>
            <input
              type="text"
              className="form-control"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>

          <div className="col-md-8">
            <label className="form-label">Positions of Interest</label>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Type a position and press Add"
                value={positionInput}
                onChange={(e) => setPositionInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPosition(); } }}
              />
              <button type="button" className="btn btn-outline-primary" onClick={addPosition}>Add</button>
            </div>
            {positions.length > 0 && (
              <div className="mt-2 d-flex flex-wrap gap-2">
                {positions.map((p) => (
                  <span key={p} className="badge bg-secondary">
                    {p}
                    <button
                      type="button"
                      className="btn-close btn-close-white btn-sm ms-2"
                      aria-label="Remove"
                      onClick={() => removePosition(p)}
                      style={{ verticalAlign: 'middle' }}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label">Upload CV (PDF or DOC/DOCX)</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
            />
            <div className="form-text">Max ~10MB</div>
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Interest'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CareerInterestForm;
