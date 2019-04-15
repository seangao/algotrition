const express = require('express');

const router = express.Router();

const editRecipeControllers = require('../controllers/editRecipe.js');

router.get('/', editRecipeControllers.editRecipe);

module.exports = router;