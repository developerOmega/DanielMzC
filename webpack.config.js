const path = require('path');
require('./dist/config/config');

module.exports = {
  entry: './assets/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js/'),
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          } 
        },
      } 
    ]
  },
  mode: process.env.NODE_ENV
};