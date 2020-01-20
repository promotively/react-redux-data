/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

const CopyPlugin = require('copy-webpack-plugin');
const GenerateJSONPlugin = require('generate-json-webpack-plugin');
const packageInfo = require('./package.json');
const path = require('path');
const webpack = require('webpack');

delete packageInfo.husky;
delete packageInfo.scripts;
delete packageInfo.devDependencies;

const dependencies = ['react', 'redux', 'react-redux'];

const copyright = `
/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */\n\n
`;

module.exports = [
  {
    devtool: 'inline-source-map',
    entry: {
      browser: 'src/index.js'
    },
    externals: dependencies,
    mode: 'production',
    module: {
      rules: [
        {
          exclude: [/node_modules/],
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-optional-chaining',
              [
                'module-resolver',
                {
                  root: ['./src/**']
                }
              ]
            ],
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
          test: /src\/(.*)\.js$/
        },
        {
          exclude: [/node_modules/],
          loader: 'remove-comments-loader',
          test: /src\/(.*)\.js$/
        }
      ]
    },
    output: {
      filename: '[name].js',
      library: '@promotively/react-redux-data',
      libraryTarget: 'umd',
      path: path.resolve('./dist/lib')
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.BannerPlugin({
        banner: copyright,
        entryOnly: true,
        raw: true
      }),
      new GenerateJSONPlugin('package.json', {
        ...packageInfo,
        browser: 'browser.js',
        main: 'server.js'
      })
    ],
    resolve: {
      modules: [path.resolve('.'), path.resolve('./node_modules'), path.resolve('../node_modules')]
    },
    stats: {
      builtAt: false,
      hash: false,
      maxModules: 0,
      version: false
    },
    target: 'web'
  },
  {
    devtool: 'inline-source-map',
    entry: {
      browser: 'example/browser.js'
    },
    mode: 'development',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          use: ['source-map-loader']
        },
        {
          exclude: [/node_modules/],
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-optional-chaining',
              [
                'module-resolver',
                {
                  root: ['./src/**']
                }
              ]
            ],
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
          test: /(example|src)\/(.*)\.js$/
        },
        {
          exclude: [/node_modules/],
          loader: 'remove-comments-loader',
          test: /src\/(.*)\.js$/
        }
      ]
    },
    output: {
      filename: '[name].js',
      path: path.resolve('./dist/example')
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.BannerPlugin({
        banner: copyright,
        entryOnly: true,
        raw: true
      }),
      new CopyPlugin([{ from: './example/index.html', to: 'index.html' }])
    ],
    resolve: {
      modules: [path.resolve('.'), path.resolve('./node_modules'), path.resolve('../node_modules')]
    },
    stats: {
      builtAt: false,
      hash: false,
      maxModules: 0,
      version: false
    },
    target: 'web'
  },
  {
    devtool: 'inline-source-map',
    entry: {
      'example/server': ['source-map-support/register', 'example/server.js'],
      'lib/server': 'src/index.js'
    },
    externals: [...dependencies, 'express'],
    mode: 'development',
    module: {
      rules: [
        {
          exclude: [/node_modules/],
          loader: 'babel-loader',
          test: /(example|src)\/(.*)\.js$/
        },
        {
          exclude: [/node_modules/],
          loader: 'remove-comments-loader',
          test: /src\/(.*)\.js$/
        }
      ]
    },
    optimization: {
      nodeEnv: false
    },
    output: {
      filename: '[name].js',
      library: '@promotively/react-redux-data',
      libraryTarget: 'commonjs2',
      path: path.resolve('./dist')
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.BannerPlugin({
        banner: copyright,
        entryOnly: true,
        raw: true
      })
    ],
    resolve: {
      modules: [path.resolve('.'), path.resolve('./node_modules'), path.resolve('../node_modules')]
    },
    stats: {
      builtAt: false,
      hash: false,
      maxModules: 0,
      version: false
    },
    target: 'node'
  }
];
