const express = require('express');
const generatorControllers = require('../controllers/planGenerator.js');

const router = express.Router();

router.get('/', generatorControllers.generator);
router.post('/', generatorControllers.saveGeneratorRequest);
router.post('/', (req, res) => res.redirect('/calendar'));

module.exports = router;
