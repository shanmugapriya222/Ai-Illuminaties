const express = require('express');
const router = express.Router();
const auth = require('../middleWare/authMiddleWare');
const { getAIAssistantResponse } = require('../services/aiService');

// @route   POST api/ai/chat
// @desc    Send a message to the AI assistant
// @access  Private
router.post('/chat', auth, async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ msg: 'Prompt is required' });
  }

  try {
    const aiResponse = await getAIAssistantResponse(prompt);
    res.json({ response: aiResponse });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;