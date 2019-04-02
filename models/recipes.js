async function getAllRecipes(db) {
    const stmt = `
        SELECT * FROM recipes
    `;
    return db.manyOrNone(stmt);
}

module.exports = {
    getAllRecipes
};