var keys = {};

try {keys = require('./keys');} catch (e) {}

module.exports = {
  port: process.env.PORT || 3000,

  /* create a key.js file with:
    module.exports = {
      database: 'postgres://your.postgres.database'
    };

   */
  databaseURL: process.env.DATABASE_URL || keys.database
};
