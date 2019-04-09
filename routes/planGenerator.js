const express = require('express');
const generatorControllers = require('../controllers/planGenerator.js');
const loginControllers = require('../controllers/login.js');

const router = express.Router();

router.get('/', loginControllers.login);
router.get('/', generatorControllers.generator);
router.post('/', generatorControllers.saveGeneratorRequest);
router.post('/', (req, res) => res.redirect('/calendar'));

module.exports = router;
