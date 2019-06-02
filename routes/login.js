const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const loginControllers = require('../controllers/login.js');
const profileControllers = require('../controllers/profile.js');

/* process login */
router.get('/', loginControllers.login);
router.post('/', urlencodedParser, loginControllers.loginProcess, (req, res) => { res.redirect('/'); });

/* process forgot password */
router.post('/forgotpassword', urlencodedParser, loginControllers.forgotPassword);

module.exports = router;
