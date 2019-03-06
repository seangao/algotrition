const express = require('express');
const generatorControllers = require('../controllers/planGenerator.js');

const router = express.Router();

router.get('/', generatorControllers.generator);

module.exports = router;
