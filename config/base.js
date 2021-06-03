const path = require('path');
const pkg = require('../package.json');
const output = path.resolve(__dirname, `../dist`);
const filename = 'functional-scss-lite.min.css';
const key = `libs/${pkg.version}/${filename}`;

module.exports = {
  output,
  filename,
  key,
};