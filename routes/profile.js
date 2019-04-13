const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const profileControllers = require('../controllers/profile');
const loginControllers = require('../controllers/login.js');

router.get('/',profileControllers.generateProfile);
router.post('/updateprofile', urlencodedParser, profileControllers.updateProfile);

module.exports = router;
