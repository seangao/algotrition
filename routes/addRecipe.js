const express = require('express');

const router = express.Router();

const addRecipeControllers = require('../controllers/addRecipe.js');

router.get('/', addRecipeControllers.addRecipePage);

router.post('/', addRecipeControllers.saveRecipe, (req, res) => res.redirect('/recipes'));

module.exports = router;
