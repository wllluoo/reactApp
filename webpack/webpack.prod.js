 const path = require('path');
 const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: [
    "babel-polyfill",
    './src/index.jsx'
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
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
          MiniCssExtractPlugin.loader, // 此插件与style.loader不能共存
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
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ // 压缩js
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCssAssetsPlugin(),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ // 分离css
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new OptimizeCssAssetsPlugin({  // 压缩css
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
};
