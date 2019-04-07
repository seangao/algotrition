let keys = {};

try { keys = require('./keys'); } catch (e) {}

module.exports = {
  port: process.env.PORT || 3000,

  /* create a keys.js (specified in .gitignore) file with:
    module.exports = {
      database: 'postgres://your.postgres.database'
    };
  */


  databaseURL: process.env.DATABASE_URL || keys.database,
};
