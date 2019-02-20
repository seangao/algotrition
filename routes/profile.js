var express = require('express');
var router = express.Router();

const profileControllers = require('../controllers/profile.js');

router.get('/', profileControllers.profile);

module.exports = router;
