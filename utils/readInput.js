const fs = require('fs');

module.exports = (day, solution) =>
  fs.readFile(`inputs/${day}.txt`, 'utf8', (err, data) => solution(data));