const express = require('express');
const multer = require('multer');
const path = require('path');
const Document = require('../models/Document');
const auth = require('../middleWare/authMiddleWare.js');
const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// @route   POST api/documents/upload
// @desc    Upload a document
// @access  Private
router.post('/upload', [auth, upload.single('document')], async (req, res) => {
  const { type, tags, description } = req.body;
  
  try {
    const newDocument = new Document({
      user: req.user.id,
      name: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      size: req.file.size,
      type,
      tags: tags ? tags.split(',') : [],
      description,
    });

    const document = await newDocument.save();
    res.json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/documents
// @desc    Get all documents for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user.id }).sort({ uploadDate: -1 });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;