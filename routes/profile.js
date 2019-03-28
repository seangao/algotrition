var express = require('express');
var router = express.Router();

const profileControllers = require('../controllers/profile');

router.get('/', profileControllers.getProfile, profileControllers.generateProfile);

module.exports = router;
