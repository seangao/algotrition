const bcrypt = require('bcrypt');

function convertHeight(feet, inch) {
  return feet * 30.48 + inch * 2.54;
}

function reverseHeight(cm) {
  const feet = Math.floor(cm / 30.48);
  const inch = Math.round((cm - feet * 30.48) / 2.54);
  return [feet, inch];
}

async function insertNewUser(db, user) {
  const hash = bcrypt.hashSync(user.password, 10);
  const stmt = `
        INSERT INTO users (username, password, age, height, weight, gender)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, username, age, height, weight, gender
    `;
  return db.one(stmt, [user.username, hash, user.age,
    convertHeight(user.ft, user.in), user.weight, user.gender]);
}

module.exports = {
  insertNewUser,
  convertHeight,
  reverseHeight,
};
