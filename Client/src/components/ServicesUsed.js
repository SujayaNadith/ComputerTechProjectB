import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Accordion, Badge, Spinner, Alert } from 'react-bootstrap';
import { FiDatabase, FiServer, FiGlobe, FiGitBranch, FiExternalLink, FiShield } from 'react-icons/fi';
import { API_BASE } from '../lib/apiBase';

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-decoration-none">
    {children} <FiExternalLink className="ms-1" />
  </a>
);

const ServicesUsed = () => {
  const [deps, setDeps] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [apiStatus, setApiStatus] = useState({ url: '', ok: false, detail: '' });

  const primary = API_BASE || process.env.REACT_APP_API_URL || '';
  const candidates = [primary, '/api'].filter(Boolean);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setErr('');
        setLoading(true);
        let lastErr = null;
        for (const base of candidates) {
          const baseClean = base.endsWith('/') ? base.slice(0, -1) : base;
          const url = `${baseClean}/meta/dependencies`;
          try {
            setApiStatus(s => ({ ...s, url }));
            const res = await fetch(url);
            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
            const ct = (res.headers.get('content-type') || '').toLowerCase();
            if (!ct.includes('application/json')) {
              // Likely received HTML (e.g., frontend dev server). Try next candidate.
              throw new Error('Non-JSON response');
            }
            const data = await res.json();
            if (!alive) return;
            setDeps(data);
            setApiStatus({ url, ok: true, detail: 'Loaded' });
            lastErr = null;
            break;
          } catch (e) {
            lastErr = e;
          }
        }
        if (lastErr) throw lastErr;
      } catch (e) {
        if (!alive) return;
        setErr('Could not load dependency list.');
        setApiStatus(s => ({ ...s, ok: false, detail: e?.message || 'Request failed' }));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Helpers
  const sortedEntries = (obj) => Object.entries(obj || {}).sort((a, b) => a[0].localeCompare(b[0]));
  const pkgLink = (name) => `https://www.npmjs.com/package/${encodeURIComponent(name)}`;

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Services & Infrastructure</h2>
          <div className="text-muted">A quick reference of platforms this site uses.</div>
        </div>
      </div>

      <Row className="g-4">
        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                  <FiDatabase size={22} className="text-success" />
                </div>
                <div>
                  <h5 className="mb-0">MongoDB Atlas</h5>
                  <small className="text-muted">Database for events, forms, etc.</small>
                </div>
              </div>
              <ul className="mb-3" style={{ color: '#2b333d' }}>
                <li>Configured in server at <code>Server/.env</code></li>
                <li>Key: <code>MONGODB_URI</code> (keep secret)</li>
              </ul>
              <div className="mt-auto d-grid">
                <Button as="a" href="https://cloud.mongodb.com" target="_blank" rel="noreferrer" variant="success">Open Atlas</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary-subtle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                  <FiServer size={22} className="text-primary" />
                </div>
                <div>
                  <h5 className="mb-0">Render</h5>
                  <small className="text-muted">Hosts the Node/Express API</small>
                </div>
              </div>
              <ul className="mb-3" style={{ color: '#2b333d' }}>
                <li>API base: <code>{primary || '/api'}</code></li>
                <li>Env path: <code>Server/.env</code> (<code>PORT</code>, CORS)</li>
              </ul>
              <div className="mt-auto d-grid">
                <Button as="a" href="https://dashboard.render.com" target="_blank" rel="noreferrer" variant="primary">Open Render</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-dark-subtle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                  <FiGlobe size={22} className="text-dark" />
                </div>
                <div>
                  <h5 className="mb-0">Vercel</h5>
                  <small className="text-muted">Hosts the frontend</small>
                </div>
              </div>
              <ul className="mb-3" style={{ color: '#2b333d' }}>
                <li>Frontend env keys start with <code>REACT_APP_*</code></li>
                <li>Example: <code>REACT_APP_API_URL</code> → backend URL</li>
              </ul>
              <div className="mt-auto d-grid">
                <Button as="a" href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" variant="secondary">Open Vercel</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-info-subtle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                  <FiGitBranch size={22} className="text-info" />
                </div>
                <div>
                  <h5 className="mb-0">GitHub</h5>
                  <small className="text-muted">Source code and collaboration</small>
                </div>
              </div>
              <ul className="mb-3" style={{ color: '#2b333d' }}>
                <li>Repo contains <code>Client/</code> and <code>Server/</code></li>
                <li>Branch: <code>main</code></li>
              </ul>
              <div className="mt-auto d-grid">
                <Button as="a" href="https://github.com/" target="_blank" rel="noreferrer" variant="info">Open GitHub</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-warning-subtle d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48 }}>
                  <FiShield size={22} className="text-warning" />
                </div>
                <div>
                  <h5 className="mb-0">Environment & Secrets</h5>
                  <small className="text-muted">Where to manage configuration</small>
                </div>
              </div>
              <ul className="mb-3" style={{ color: '#2b333d' }}>
                <li>Server: <code>Server/.env</code> (Mongo URI, PORT, ADMIN_PASSWORD)</li>
                <li>Client: Vercel project env vars (<code>REACT_APP_*</code>)</li>
              </ul>
              <div className="text-muted small">Never share .env files publicly.</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <hr className="my-5" />
      <h4 className="mb-1">Dependencies</h4>
      <p className="text-muted mb-2">Lists packages used by the frontend and backend. Versions are read from package.json.</p>
      <div className="small mb-3">
        <strong>API endpoint:</strong> <code>{apiStatus.url || `${(primary || '/api').replace(/\/$/, '')}/meta/dependencies`}</code>
        {apiStatus.detail && (
          <span className={`ms-2 ${apiStatus.ok ? 'text-success' : 'text-danger'}`}>{apiStatus.ok ? 'OK' : apiStatus.detail}</span>
        )}
      </div>

      {loading && (
        <div className="py-3"><Spinner animation="border" size="sm" className="me-2" /> Loading...</div>
      )}
      {!loading && err && <Alert variant="warning">{err}</Alert>}
      {!loading && deps && (
        <Row className="g-4">
          <Col md={6}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0">Server</h5>
                  <Badge bg="secondary">{deps.server?.name || 'server'} {deps.server?.version || ''}</Badge>
                </div>
                <Accordion alwaysOpen defaultActiveKey={["deps"]}>
                  <Accordion.Item eventKey="deps">
                    <Accordion.Header>
                      Dependencies ({Object.keys(deps.server?.dependencies || {}).length})
                    </Accordion.Header>
                    <Accordion.Body>
                      {Object.keys(deps.server?.dependencies || {}).length === 0 ? (
                        <div className="text-muted">No dependencies listed.</div>
                      ) : (
                        <ul className="mb-0" style={{ columns: 2, columnGap: '2rem' }}>
                          {sortedEntries(deps.server?.dependencies).map(([name, ver]) => (
                            <li key={name}>
                              <a href={pkgLink(name)} target="_blank" rel="noreferrer" className="link-primary text-decoration-none">{name}</a>
                              <span className="text-muted"> {ver}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="dev">
                    <Accordion.Header>
                      Dev Dependencies ({Object.keys(deps.server?.devDependencies || {}).length})
                    </Accordion.Header>
                    <Accordion.Body>
                      {Object.keys(deps.server?.devDependencies || {}).length === 0 ? (
                        <div className="text-muted">No dev dependencies listed.</div>
                      ) : (
                        <ul className="mb-0" style={{ columns: 2, columnGap: '2rem' }}>
                          {sortedEntries(deps.server?.devDependencies).map(([name, ver]) => (
                            <li key={name}>
                              <a href={pkgLink(name)} target="_blank" rel="noreferrer" className="link-primary text-decoration-none">{name}</a>
                              <span className="text-muted"> {ver}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0">Client</h5>
                  <Badge bg="secondary">{deps.client?.name || 'client'} {deps.client?.version || ''}</Badge>
                </div>
                <Accordion alwaysOpen defaultActiveKey={["deps"]}>
                  <Accordion.Item eventKey="deps">
                    <Accordion.Header>
                      Dependencies ({Object.keys(deps.client?.dependencies || {}).length})
                    </Accordion.Header>
                    <Accordion.Body>
                      {Object.keys(deps.client?.dependencies || {}).length === 0 ? (
                        <div className="text-muted">Not available on server deployment (client not bundled).</div>
                      ) : (
                        <ul className="mb-0" style={{ columns: 2, columnGap: '2rem' }}>
                          {sortedEntries(deps.client?.dependencies).map(([name, ver]) => (
                            <li key={name}>
                              <a href={pkgLink(name)} target="_blank" rel="noreferrer" className="link-primary text-decoration-none">{name}</a>
                              <span className="text-muted"> {ver}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="dev">
                    <Accordion.Header>
                      Dev Dependencies ({Object.keys(deps.client?.devDependencies || {}).length})
                    </Accordion.Header>
                    <Accordion.Body>
                      {Object.keys(deps.client?.devDependencies || {}).length === 0 ? (
                        <div className="text-muted">No dev dependencies listed.</div>
                      ) : (
                        <ul className="mb-0" style={{ columns: 2, columnGap: '2rem' }}>
                          {sortedEntries(deps.client?.devDependencies).map(([name, ver]) => (
                            <li key={name}>
                              <a href={pkgLink(name)} target="_blank" rel="noreferrer" className="link-primary text-decoration-none">{name}</a>
                              <span className="text-muted"> {ver}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ServicesUsed;
