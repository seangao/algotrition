const express = require('express');

const router = express.Router();

const indexControllers = require('../controllers/index.js');

/* GET home page. */
router.get('/', indexControllers.index);

module.exports = router;
