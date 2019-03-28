async function searchUserbyID(db, id) {
   const stmt = `
       SELECT username, age, height, weight FROM public."Users" WHERE
       id = $1
   `;
   return db.oneOrNone(stmt, [id])
}

module.exports = {
    searchUserbyID
};
