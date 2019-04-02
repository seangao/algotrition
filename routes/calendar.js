const express = require('express');
const router = express.Router();

const calendarControllers = require('../controllers/calendar.js');

router.get('/', calendarControllers.calendar);

module.exports = router;
