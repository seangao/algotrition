var express = require('express');
var router = express.Router();

const recipesControllers = require('../controllers/recipes.js');

router.get('/', recipesControllers.recipes);

module.exports = router;
