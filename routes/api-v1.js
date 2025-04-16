const express = require('express');
const router = express.Router();

const usersRouter = require('./users')
const sessionsRouter = require('./sessions')
const roomsRouter = require('./rooms')
const registrationsRouter = require('./registrations')
const villagesRouter = require('./villages')

// Routers
router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/rooms', roomsRouter);
router.use('/registrations', registrationsRouter);
router.use('/villages', villagesRouter);

// Root route
router.get('/', (req, res) => {
  res.send('Hello API!');
})


module.exports = router;