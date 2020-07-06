const path = require('path')

module.exports = {
  entry: './js/index.js',
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}