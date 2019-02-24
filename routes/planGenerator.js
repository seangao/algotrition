var express = require('express');
var router = express.Router();

const generatorControllers = require('../controllers/planGenerator.js');

router.get('/', generatorControllers.generator);

module.exports = router;
