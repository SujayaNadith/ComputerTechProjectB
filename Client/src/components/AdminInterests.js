// AdminInterests.js needs proofreading
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api';

function AdminInterests() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/interests`, { withCredentials: true });
      setItems(res.data || []);
    } catch (e) {
      console.error('Failed to load interests:', e);
      setError('Failed to load interests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const downloadCv = (id) => {
    window.open(`${API_BASE}/interests/${id}/cv`, '_blank');
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this interest?')) return;
    try {
      await axios.delete(`${API_BASE}/interests/${id}`, { withCredentials: true });
      setItems((prev) => prev.filter((x) => x._id !== id && x.id !== id));
    } catch (e) {
      alert('Failed to delete.');
    }
  };

  if (loading) return <div className="p-3">Loading interests…</div>;
  if (error) return <div className="alert alert-danger m-3">{error}</div>;

  return (
    <div className="container my-4">
      <h3 className="mb-3">See Interests to Work</h3>
      {items.length === 0 ? (
        <div className="alert alert-info">No interests yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Name</th>
                <th>Family Name</th>
                <th>Positions</th>
                <th>CV</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it._id || it.id}>
                  <td>{new Date(it.createdAt).toLocaleString()}</td>
                  <td>{it.title}</td>
                  <td>{`${it.firstName || ''} ${it.lastName || ''}`.trim()}</td>
                  <td>{it.familyName || '-'}</td>
                  <td>{(it.positions || []).join(', ')}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => downloadCv(it._id || it.id)}>
                      Download CV
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => remove(it._id || it.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminInterests;

