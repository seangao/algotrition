const express = require('express');

const router = express.Router();

const recipesControllers = require('../controllers/recipes.js');
const loginControllers = require('../controllers/login.js');

router.get('/', loginControllers.login);
router.get('/', recipesControllers.recipes);

module.exports = router;
