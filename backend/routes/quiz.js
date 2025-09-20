const express = require('express');
const Quiz = require('../models/Quiz');
const auth = require('../middleWare/authMiddleWare');
const router = express.Router();

// @route   POST api/quiz
// @desc    Submit or update quiz answers
// @access  Private
router.post('/', auth, async (req, res) => {
  const quizData = { ...req.body, user: req.user.id };

  try {
    let quiz = await Quiz.findOne({ user: req.user.id });

    if (quiz) {
      // Update existing quiz
      quiz = await Quiz.findOneAndUpdate({ user: req.user.id }, { $set: quizData }, { new: true });
      return res.json(quiz);
    }

    // Create new quiz
    quiz = new Quiz(quizData);
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;