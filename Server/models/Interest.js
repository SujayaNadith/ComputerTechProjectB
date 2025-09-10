// Server/models/Interest.js
const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { _id: false }
);

const interestSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true }, // e.g., Mr, Mrs, Dr, or custom
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    familyName: { type: String, trim: true },
    positions: { type: [String], default: [] },
    cv: { type: cvSchema, required: true },
    // Admin workflow fields
    adminStatus: {
      type: String,
      enum: ['new', 'in_progress', 'resolved'],
      default: 'new',
    },
    adminNote: { type: String, default: '', trim: true },
  },
  { timestamps: true, versionKey: false }
);

interestSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    if (ret.cv && ret.cv.data) delete ret.cv.data; // omit raw CV buffer in JSON
  },
});

module.exports = mongoose.model('Interest', interestSchema);

