const express = require('express');

const router = express.Router();

const calendarControllers = require('../controllers/calendar.js');

router.get('/', calendarControllers.calendar);
router.get('/', (req, res) => res.redirect('/generator'));


module.exports = router;
