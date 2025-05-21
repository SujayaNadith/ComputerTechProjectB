const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
console.log("✅ MongoDB URI:", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((error) => console.error("❌ Error connecting to MongoDB:", error));

app.get("/", (req, res) => {
  res.send("Server is running with MongoDB Atlas!");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
