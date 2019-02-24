var express = require('express');
var router = express.Router();

const registerControllers = require('../controllers/register.js');

router.get('/', registerControllers.register);

module.exports = router;
