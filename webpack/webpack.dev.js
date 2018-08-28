const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    "babel-polyfill",
    './src/index.jsx'
  ],
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [
        '.js', '.jsx',
    ],
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
    ]
  }
};
