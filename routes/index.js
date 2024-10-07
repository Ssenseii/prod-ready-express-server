const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
  res.send('Router Active!');
});

router.get('/csrf-token', (req, res) => {
  res.json({ token: req.csrfToken() });
});

router.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

module.exports = router;
