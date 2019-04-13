const express = require('express');

const router = express.Router();

const indexControllers = require('../controllers/index.js');
const loginControllers = require('../controllers/login.js');
/* GET home page. */
router.get('/', indexControllers.index);

module.exports = router;
