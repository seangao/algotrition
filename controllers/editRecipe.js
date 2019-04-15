async function editRecipe(req, res, next) {
  console.log(req.body);
  res.render('editRecipe');
}

module.exports = {
    editRecipe,
}