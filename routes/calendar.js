const express = require('express');

const router = express.Router();

const calendarControllers = require('../controllers/calendar.js');
const loginControllers = require('../controllers/login.js');

router.get('/', loginControllers.login);
router.get('/', calendarControllers.calendar);


module.exports = router;
