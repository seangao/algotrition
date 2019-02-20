var express = require('express');
var boostrap = require('bootstrap');
var router = express.Router();

const indexControllers = require('../controllers/index.js');

/* GET home page. */
router.get('/', indexControllers.index);

module.exports = router;
