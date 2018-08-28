const path = require('path');
const rootPath = path.join(__dirname, '../');

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
    alias: {
      utils: path.join(rootPath, 'src/utils'),
    }
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
