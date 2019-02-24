var express = require('express');
var router = express.Router();

const loginControllers = require('../controllers/login.js');

router.get('/', loginControllers.login);

module.exports = router;
