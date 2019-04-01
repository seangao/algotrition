const express = require('express');
const router = express.Router();

const profileControllers = require('../controllers/profile');

router.get('/', profileControllers.getProfile, profileControllers.generateProfile);

module.exports = router;
