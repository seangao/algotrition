const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const registerControllers = require('../controllers/register');
const profileControllers = require('../controllers/profile.js');


/* render registration page */
router.get('/', registerControllers.register);

/* process registration */
router.post('/registerprocess', urlencodedParser, registerControllers.registerProcess, profileControllers.generateProfile);

module.exports = router;
