var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const loginControllers = require('../controllers/login.js');
const profileControllers = require('../controllers/profile.js');


/* render login page */
router.get('/', loginControllers.login);

/* process login */
router.post('/loginprocess', urlencodedParser, loginControllers.loginProcess, profileControllers.generateProfile);


module.exports = router;
