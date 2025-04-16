const express = require('express');
const router = express.Router();

// GET /registrations/
router.get('/', (req, res) => {
  res.send('List of registrations');
});

// GET /registrations/:id
router.get('/:id', (req, res) => {
  res.send(`registration ID: ${req.params.id}`);
});

// POST /registrations/
router.post('/', (req, res) => {
  res.send('Create a new registration');
});

module.exports = router;