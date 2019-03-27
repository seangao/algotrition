var express = require('express');
var router = express.Router();

const logoutControllers = require('../controllers/logout');

router.get('/', logoutControllers.logout);

module.exports = router;