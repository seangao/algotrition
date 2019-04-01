const bcrypt = require('bcrypt')

async function insertNewUser(db, user) {
    let hash = bcrypt.hashSync(user.password, 10);
    const stmt = `
        INSERT INTO users (username, password, age, height, weight)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, age, height, weight
    `;
    return db.one(stmt, [user.username, hash, user.age, convertHeight(user.ft, user.in), user.weight]);
}

function convertHeight(feet, inch) {
    return feet * 30.48 + inch * 2.54;
}

module.exports = {
  insertNewUser
};
