import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Minimal PDF.js canvas viewer that works on mobile without new tabs.
 * Loads UMD build from CDN and renders pages to <canvas> with simple controls.
 */
const PDFJS_CDN_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105';

const loadScriptOnce = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });
};

const usePdfJs = () => {
  const [pdfjsLib, setPdfjsLib] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await loadScriptOnce(`${PDFJS_CDN_BASE}/pdf.min.js`);
        const lib = window.pdfjsLib;
        if (!lib) throw new Error('pdfjsLib not available');
        lib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN_BASE}/pdf.worker.min.js`;
        if (mounted) setPdfjsLib(lib);
      } catch (e) {
        if (mounted) setError(e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { pdfjsLib, error };
};

const ControlButton = ({ onClick, children, disabled }) => (
  <button
    type="button"
    className="btn btn-sm btn-outline-secondary"
    onClick={onClick}
    disabled={disabled}
    style={{ minWidth: 36 }}
  >
    {children}
  </button>
);

const PdfCanvasViewer = ({ fileUrl }) => {
  const { pdfjsLib, error: loaderError } = usePdfJs();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [doc, setDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [scale, setScale] = useState(1);
  const [renderError, setRenderError] = useState(null);
  const [isRendering, setIsRendering] = useState(false);

  const fitToWidthScale = useCallback((viewportWidth, pageViewport) => {
    if (!viewportWidth || !pageViewport) return 1;
    return Math.max(0.5, Math.min(3, viewportWidth / pageViewport.width));
  }, []);

  // Load document when pdfjs is ready or fileUrl changes
  useEffect(() => {
    let cleanup = null;
    (async () => {
      setRenderError(null);
      setDoc(null);
      setPageNum(1);
      setNumPages(1);
      if (!pdfjsLib || !fileUrl) return;
      try {
        const loadingTask = pdfjsLib.getDocument({ url: fileUrl });
        const loadedDoc = await loadingTask.promise;
        setDoc(loadedDoc);
        setNumPages(loadedDoc.numPages);
        // compute initial scale to fit width
        const page = await loadedDoc.getPage(1);
        const initialViewport = page.getViewport({ scale: 1 });
        const containerWidth = containerRef.current ? containerRef.current.clientWidth : 600;
        const s = fitToWidthScale(containerWidth, initialViewport);
        setScale(s);
      } catch (e) {
        setRenderError(e);
      }
    })();
    return () => {
      if (cleanup) cleanup();
    };
  }, [pdfjsLib, fileUrl, fitToWidthScale]);

  // Render current page
  const renderPage = useCallback(async () => {
    if (!doc || !canvasRef.current) return;
    setIsRendering(true);
    try {
      const page = await doc.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      await page.render({ canvasContext: context, viewport }).promise;
      setRenderError(null);
    } catch (e) {
      setRenderError(e);
    } finally {
      setIsRendering(false);
    }
  }, [doc, pageNum, scale]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // Refit on resize
  useEffect(() => {
    const onResize = () => {
      if (!doc) return;
      // Recompute scale to fit width, but keep user zoom if > 1.0
      (async () => {
        const page = await doc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1 });
        const containerWidth = containerRef.current ? containerRef.current.clientWidth : 600;
        const fitScale = fitToWidthScale(containerWidth, viewport);
        setScale((prev) => (prev < 1.01 ? fitScale : prev));
      })();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [doc, pageNum, fitToWidthScale]);

  const canPrev = pageNum > 1;
  const canNext = pageNum < numPages;

  const toolbar = useMemo(() => (
    <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between p-2 border-bottom bg-light">
      <div className="d-flex gap-2 align-items-center">
        <ControlButton onClick={() => setPageNum((n) => Math.max(1, n - 1))} disabled={!canPrev}>
          ‹
        </ControlButton>
        <span className="text-muted" style={{ minWidth: 90 }}>
          Page {pageNum} / {numPages}
        </span>
        <ControlButton onClick={() => setPageNum((n) => Math.min(numPages, n + 1))} disabled={!canNext}>
          ›
        </ControlButton>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <ControlButton onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}>-</ControlButton>
        <span className="text-muted" style={{ minWidth: 48, textAlign: 'center' }}>{Math.round(scale * 100)}%</span>
        <ControlButton onClick={() => setScale((s) => Math.min(3, s + 0.2))}>+</ControlButton>
      </div>
    </div>
  ), [canPrev, canNext, numPages, pageNum, scale]);

  if (loaderError) {
    return (
      <div className="p-3">
        Unable to load PDF engine.{' '}
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">Open PDF in a new tab</a>.
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {toolbar}
      <div className="d-flex justify-content-center align-items-start" style={{ overflow: 'auto' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', maxWidth: '100%' }} />
      </div>
      {renderError && (
        <div className="p-3 text-danger small">Failed to render PDF. Try the Download button.</div>
      )}
      {isRendering && (
        <div className="p-2 text-muted small">Rendering…</div>
      )}
    </div>
  );
};

export default PdfCanvasViewer;


