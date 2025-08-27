// Server/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,          // removes leading/trailing spaces
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,      // adds createdAt & updatedAt automatically
    versionKey: false,     // removes __v
  }
);

// Index for faster queries/sorting on date
eventSchema.index({ date: 1 });

// Customize JSON output
eventSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString(); // add id field
    delete ret._id;              // remove raw _id
  },
});

module.exports = mongoose.model('Event', eventSchema);
