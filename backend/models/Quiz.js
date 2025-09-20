const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  interests: { type: String, required: true },
  skills: { type: String, required: true },
  goals: { type: String, required: true },
  achievements: [{ type: String }],
  extracurriculars: [{ type: String }],
  dreamCareer: { type: String },
});

module.exports = mongoose.model('Quiz', QuizSchema);