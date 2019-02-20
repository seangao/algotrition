var express = require('express');
var router = express.Router();

const profileControllers = require('../controllers/profile.js');

/* GET home page. */
router.get('/', profileControllers.profile);

module.exports = router;
