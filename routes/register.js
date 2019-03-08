var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const registerControllers = require('../controllers/register');

/* render registration page */
router.get('/', registerControllers.register);

/* process registration */
router.post('/registerprocess', urlencodedParser, registerControllers.registerProcess);

module.exports = router;
