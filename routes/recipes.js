const express = require('express');

const router = express.Router();

const recipesControllers = require('../controllers/recipes.js');

router.get('/', recipesControllers.getUserRecipe);
router.get('/', recipesControllers.recipes);

router.post('/', recipesControllers.deleteRecipe, (req, res) => res.redirect('back'));

module.exports = router;
