var autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    webpack = require('webpack'),
    path = require('path'),
    libraryName = 'cycle-text',
    outputFile = libraryName + '.js',
    validate = require('webpack-validator'),
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    plugins = [new ExtractTextPlugin('cycle-text.css')]
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
    umdNamedDefine: true,
    publicPath: '/lib/'
  },
  module: {
    loaders: [
      {
        test:  /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss!sass')
      },
    ]
  },
  plugins: plugins,
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.scss']
  }
};

module.exports = validate(config);