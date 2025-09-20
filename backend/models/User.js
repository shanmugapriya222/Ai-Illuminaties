const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  education: { type: String, required: true },
  location: { type: String, required: true },
  role: {
    type: String,
    enum: ['pre-university', 'university', 'job-seeker'],
    required: true,
  },
  parentEmail: { type: String },
  achievements: [{ type: String }],
  certifications: [{ type: String }],
  wellbeingScore: { type: Number, default: 75 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);