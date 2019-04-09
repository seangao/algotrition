const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const loginControllers = require('../controllers/login.js');
const profileControllers = require('../controllers/profile.js');


/* render login page */
router.get('/', loginControllers.login);

/* process login */
router.post('/loginprocess', urlencodedParser, loginControllers.loginProcess, profileControllers.generateProfile);

/* process forgot password */
router.post('/forgotpassword', urlencodedParser, loginControllers.forgotPassword);

module.exports = router;
