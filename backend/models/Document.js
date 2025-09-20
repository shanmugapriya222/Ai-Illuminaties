const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['certificate', 'transcript', 'resume', 'portfolio', 'recommendation', 'other'],
    required: true,
  },
  filePath: { type: String, required: true }, // Path to the stored file
  fileType: { type: String, required: true }, // MIME type
  size: { type: Number, required: true }, // Size in bytes
  uploadDate: { type: Date, default: Date.now },
  encrypted: { type: Boolean, default: true },
  shared: { type: Boolean, default: false },
  tags: [{ type: String }],
  description: { type: String },
});

module.exports = mongoose.model('Document', DocumentSchema);