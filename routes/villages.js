const express = require('express');
const router = express.Router();

// GET /villages/
router.get('/', (req, res) => {
  res.send('List of villages');
});

// GET /villages/:id
router.get('/:id', (req, res) => {
  res.send(`village ID: ${req.params.id}`);
});

// POST /villages/
router.post('/', (req, res) => {
  res.send('Create a new village');
});

module.exports = router;