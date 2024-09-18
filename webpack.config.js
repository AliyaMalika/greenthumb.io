const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',

  entry: 'index.js', // Your entry file path
  output: {
 
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' // Output directory
  }
};
