var webpack = require('webpack'),
    path = require('path'),
    libraryName = 'cycle-text',
    outputFile = libraryName + '.js',
    validate = require('webpack-validator'),
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    plugins = [], outputFile,
    env = process.env.WEBPACK_ENV;

    if (env === 'build') {
      plugins.push(new UglifyJsPlugin({ minimize: true }));
      outputFile = libraryName + '.min.js';
    } else {
      outputFile = libraryName + '.js';
    }

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test:  /(\.js)$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = validate(config);