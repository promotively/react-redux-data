import nodeExternals from 'webpack-node-externals';
import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'source-map',
  entry: {
    node: 'lib/index.js'
  },
  externals: [ nodeExternals() ],
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
    libraryTarget: 'commonjs2',
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
  target: 'node'
};
