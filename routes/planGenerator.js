var express = require('express');
var router = express.Router();

const generatorControllers = require('../controllers/planGenerator.js');

/* GET home page. */
router.get('/', generatorControllers.generator);

module.exports = router;
