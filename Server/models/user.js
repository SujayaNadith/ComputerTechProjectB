const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Student", "Parent", "Teacher", "Admin"],
    default: "Student",
    required: true
  },
  accountId: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
    default: "default-profile.jpg",
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
