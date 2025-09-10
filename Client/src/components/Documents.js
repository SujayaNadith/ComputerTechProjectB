import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';

const BASE_PATH = '/documents';

/**
 * Keep 'title' for display only.
 * Set 'file' to the EXACT filename in Client/public/documents (case/spacing included).
 */
const documentList = [
  { title: "Student Welfare", file: "Student-Welfare.pdf" },
  { title: "Anti-Bullying and Harassment", file: "Anti-Bullying and Harassment.pdf" },
  { title: "Supervision of Students", file: "Supervision of Students.pdf" },
  { title: "Off-site Activities, Excursions & Camps", file: "Off-site Activities, Excursions & Camps.pdf" },
  { title: "Care Arrangements for Ill Students", file: "Care Arrangements for Ill Students.pdf" },
  { title: "First Aid", file: "First Aid.pdf" },
  { title: "Distribution of Medication", file: "Distribution of Medication.pdf" },
  { title: "ICT Agreement", file: "ICT Agreement.pdf" },
  { title: "ICT Policy", file: "ICT Policy.pdf" },
  { title: "Complaints Handling", file: "Complaints Handling.pdf" },
  { title: "Critical Incident Management", file: "Critical Incident Management.pdf" },
  { title: "Student Behaviour Management", file: "Student Behaviour Management.pdf" },
  { title: "Online Safety", file: "Online Safety.pdf" },
  { title: "Occupational Health & Safety", file: "Occupational Health & Safety.pdf" },
  { title: "Emergency Management Plan", file: "Emergency Management Plan.pdf" },
  { title: "Anaphylaxis Management", file: "Anaphylaxis Management.pdf" },
  { title: "Child Safety - Wellbeing", file: "Child Safety - Wellbeing.pdf" },
  { title: "Child Safety - Code of Conduct", file: "Child Safety - Code of Conduct.pdf" },
  { title: "Child Safety - Reporting and Responding", file: "Child Safety - Reporting and Responding.pdf" },
  { title: "Student Attendance", file: "Student Attendance.pdf" },
  { title: "Privacy", file: "Privacy.pdf" }
];

const Documents = () => {
  const [showViewer, setShowViewer] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null); // { title, file }

  // Build a safe URL for the iframe (handles spaces & special chars)
  const activeUrl = useMemo(() => {
    if (!activeDoc) return '';
    return `${BASE_PATH}/${encodeURIComponent(activeDoc.file)}`;
  }, [activeDoc]);

  // HEAD check before opening the modal (avoids blank iframe on 404)
  const handleOpen = async (doc) => {
    const url = `${BASE_PATH}/${encodeURIComponent(doc.file)}`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) throw new Error('Not found');
      setActiveDoc(doc);
      setShowViewer(true);
    } catch {
      // Fallback: open in new tab if the asset isn't found where expected
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleClose = () => {
    setShowViewer(false);
    setTimeout(() => setActiveDoc(null), 150);
  };

  return (
    <div className="bg-light py-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Container>
        <h2 className="text-center fw-bold mb-4 display-5" style={{ color: '#2b333d' }}>
          School Policy Documents
        </h2>

        <Row className="g-4">
          {documentList.map((doc, idx) => (
            <Col key={`${doc.title}-${idx}`} xs={12} sm={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-2" style={{ color: '#2b333d' }}>
                    {doc.title}
                  </Card.Title>
                  <Card.Text className="text-muted flex-grow-1">
                    PDF • {doc.file}
                  </Card.Text>

                  <div className="d-flex gap-2 mt-2">
                    <Button
                      variant="primary"
                      className="fw-semibold"
                      onClick={() => handleOpen(doc)}
                    >
                      View
                    </Button>

                    <a
                      className="btn btn-outline-secondary fw-semibold"
                      href={`${BASE_PATH}/${encodeURIComponent(doc.file)}`}
                      download={doc.file}
                    >
                      Download
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* PDF Viewer Modal */}
        <Modal
          show={showViewer}
          onHide={handleClose}
          size="xl"
          centered
          aria-labelledby="pdf-viewer-title"
          dialogClassName="pdf-viewer-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="pdf-viewer-title">
              {activeDoc?.title ?? 'Document'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ padding: 0 }}>
            {activeUrl ? (
              <iframe
                title={activeDoc?.title ?? 'PDF'}
                src={activeUrl}
                style={{ width: '100%', height: '80vh', border: 'none' }}
              />
            ) : (
              <div className="p-4">No document selected.</div>
            )}
          </Modal.Body>

          <Modal.Footer
            er className="d-flex justify-content-between"
          >
            <small className="text-muted">
              Use your browser’s PDF toolbar to zoom/print. Scroll to read all pages.
            </small>
            {activeUrl && (
              <a className="btn btn-primary fw-semibold" href={activeUrl} download={activeDoc?.file}>
                Download
              </a>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Documents;