async function getAllRecipes(db) {
    const stmt = `
        SELECT * FROM recipes LIMIT 500
    `;
    let recipes = await db.manyOrNone(stmt);
    return recipes;
}

module.exports = {
    getAllRecipes
};
