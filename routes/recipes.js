const express = require('express');

const router = express.Router();

const recipesControllers = require('../controllers/recipes.js');

router.get('/', recipesControllers.getUserRecipe);
router.get('/', recipesControllers.recipes);

router.post('/delete', recipesControllers.deleteRecipe, (req, res) => res.redirect('back'));
router.post('/edit', recipesControllers.editRecipe);
router.post('/saveChange', recipesControllers.saveChange, (req, res) => res.redirect('/recipes'));

module.exports = router;
