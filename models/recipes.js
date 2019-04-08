async function getAllRecipes(db) {
  const stmt = `
        SELECT * FROM recipes_sp LIMIT 500
    `;
  const recipes = await db.manyOrNone(stmt);
  console.log(recipes);
  return recipes;
}

module.exports = {
  getAllRecipes,
};
