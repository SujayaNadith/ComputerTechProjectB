// Server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// Load .env from this folder when not in production
if (process.env.NODE_ENV !== "production") {
  try {
    const path = require("path");
    require("dotenv").config({ path: path.resolve(__dirname, ".env") });
  } catch {}
}

const app = express();

/* ----------------------------- Core middleware ---------------------------- */
app.use(helmet());              // security headers
app.use(compression());         // gzip responses
// Increase JSON limit to handle base64 CV uploads from careers form
app.use(express.json({ limit: "15mb" }));

// Dev request logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Trust Render proxy (needed if you ever set secure cookies)
app.set("trust proxy", 1);

// Basic rate limit (tune as needed)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,            // 120 req/min per IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

/* ---------------------------------- CORS ---------------------------------- */
// Allow your Vercel domain + localhost + Vercel preview deployments
const allowedOrigins = new Set([
  process.env.CORS_ORIGIN,           // e.g. https://capstone-two-wine.vercel.app
  "http://localhost:3000",
]);

// Allow Vercel preview subdomains like https://branch--project.vercel.app
const vercelPreviewRegex = /^https:\/\/[a-z0-9-]+--[a-z0-9-]+\.vercel\.app$/i;

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true); // curl/postman
    if (allowedOrigins.has(origin) || vercelPreviewRegex.test(origin)) {
      return cb(null, true);
    }
    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));

/* --------------------------- Health/Readiness ------------------------------ */
app.get("/health", (_req, res) => res.status(200).send("ok"));

app.get("/ready", (_req, res) => {
  // 1 = connected, 2 = connecting, per mongoose docs
  const state = mongoose.connection.readyState;
  if (state === 1) return res.status(200).json({ status: "ready" });
  return res.status(503).json({ status: "starting", mongoState: state });
});

/* --------------------------------- Routes --------------------------------- */
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const enrolmentRoutes = require('./routes/enrolmentRoutes');
const eventRoutes = require('./routes/eventRoutes');
const interestRoutes = require('./routes/interestRoutes');

// Public API base path to match client REACT_APP_API_URL (e.g., http://localhost:5001/api)
app.use('/api/admin', adminRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/enrolments', enrolmentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/interests', interestRoutes);

/* --------------------------------- Errors --------------------------------- */
// 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});

// Central error handler (don’t leak internals in prod)
app.use((err, req, res, _next) => {
  const status = err.status || 500;
  const message = (process.env.NODE_ENV !== "production")
    ? (err.message || "Server error")
    : "Server error";
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error("Error:", err);
  }
  res.status(status).json({ error: message });
});

/* ---------------------------- Mongo connection ---------------------------- */
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("❌ Missing MONGODB_URI"); // do NOT print the URI
  process.exit(1);
}

mongoose.set("strictQuery", true);

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected");
});
mongoose.connection.on("error", (e) => {
  console.error("Mongo error:", e.message);
});

/* ------------------------------- Start server ----------------------------- */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server listening on :${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("🛑 SIGTERM received, shutting down...");
  await mongoose.connection.close(false);
  process.exit(0);
});
