const fs = require('fs');

function readSQLFile(fileName) {
  const query = fs.readFileSync(fileName).toString()
    .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
    .replace(/\s+/g, ' '); // excess white space

  return query;
}

module.exports = {
  readSQLFile,
};
