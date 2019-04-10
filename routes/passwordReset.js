const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const loginControllers = require('../controllers/login.js');
const passwordResetControllers = require('../controllers/passwordReset.js');


/* render password reset page */
router.get('/', passwordResetControllers.passwordReset);

/* process forgot password */
router.post('/forgotpassword', urlencodedParser, loginControllers.forgotPassword);

module.exports = router;
