var express = require('express');
var router = express.Router();

const profileControllers = require('../controllers/profile');

router.get('/', profileControllers.generateProfileDummy);

module.exports = router;
