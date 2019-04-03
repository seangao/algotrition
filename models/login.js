async function searchUser(db, user) {
    const stmt = `
        SELECT id, username, password, age, height, weight FROM users WHERE
        username = '$1:value'
    `;
    return db.oneOrNone(stmt, [user.username]);
}

module.exports = {
    searchUser
};
