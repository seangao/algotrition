const bcrypt = require('bcrypt');


async function searchUser(db, user) {
  const stmt = `
        SELECT id, username, password, age, height, weight, gender FROM users WHERE
        username = '$1:value'
    `;
  return db.oneOrNone(stmt, [user.username]);
}

async function changePasswordbyUsername(db, info) {
  const hash = bcrypt.hashSync(info.password, 10);
  const stmt = `
        UPDATE users
        SET password = $1
        WHERE username = $2
    `;
  return db.oneOrNone(stmt, [hash, info.username]);
}

module.exports = {
  searchUser, changePasswordbyUsername,
};
