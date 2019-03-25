async function searchUser(db, user) {
    const stmt = `
        SELECT username, age, height, weight FROM users WHERE
        username = '$1:value' AND password = '$2:value'
    `;
    return db.oneOrNone(stmt, [user.username, user.password]);
  }

  module.exports = {
     searchUser
  };
