const express = require('express');
const router = express.Router();

// GET /sessions/
router.get('/', (req, res) => {
  res.send('List of sessions');
});

// GET /sessions/:id
router.get('/:id', (req, res) => {
  res.send(`session ID: ${req.params.id}`);
});

// POST /sessions/
router.post('/', (req, res) => {
  res.send('Create a new session');
});

module.exports = router;