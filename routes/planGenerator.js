const express = require('express');
const generatorControllers = require('../controllers/planGenerator.js');

const router = express.Router();

router.get('/', generatorControllers.generator);
router.post('/', generatorControllers.saveGeneratorRequest)

module.exports = router;
