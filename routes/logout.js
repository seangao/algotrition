const express = require('express');

const router = express.Router();

const logoutControllers = require('../controllers/logout');

router.get('/', logoutControllers.logout);

module.exports = router;
