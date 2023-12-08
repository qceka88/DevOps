const fs = require('fs');
module.exports = JSON.parse(
  fs.readFileSync('./models/boardgames.json'));
