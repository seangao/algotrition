var express = require('express');
var router = express.Router();

const calendarControllers = require('../controllers/calendar.js');

router.get('/', calendarControllers.calendar);

module.exports = router;
