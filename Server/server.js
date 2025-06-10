const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
console.log("✅ MongoDB URI:", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
const contactRoutes = require("./routes/contactRoutes");
const enrolmentRoutes = require("./routes/enrolmentRoutes");
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require('./routes/adminRoutes');

// Connect to MongoDB
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((error) => console.error("❌ Error connecting to MongoDB:", error));

// Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/enrolments", enrolmentRoutes);
app.use("/api/events", eventRoutes);
app.use('/api/a7dash87', adminRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running with MongoDB Atlas!");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
