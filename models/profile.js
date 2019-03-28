async function searchUserbyID(db, id) {
   const stmt = `
       SELECT username, age, height, weight FROM users WHERE
       id = $1
   `;
   return db.oneOrNone(stmt, [id])
}

module.exports = {
    searchUserbyID
};
