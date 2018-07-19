import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'source-map',
  entry: {
    web: 'lib/index.js'
  },
  externals: [ 'prop-types', 'react', 'redux', 'react-redux' ],
  mode: 'production',
  module: {
    rules: [{
      exclude: [ /node_modules/ ],
      loader: 'babel-loader',
      test: /lib\/(.*)\.js$/
    }]
  },
  output: {
    filename: '[name].js',
    library: 'react-redux-data',
    libraryTarget: 'umd',
    path: path.resolve('./dist')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  resolve: {
    modules: [
      path.resolve('.'),
      path.resolve('./node_modules')
    ]
  },
  stats: {
    builtAt: false,
    hash: false,
    maxModules: 0,
    version: false
  },
  target: 'web'
};
