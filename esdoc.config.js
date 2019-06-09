module.exports = {
  destination: './dist/docs',
  plugins: [{
    name: 'esdoc-standard-plugin'
  }, {
    name: 'esdoc-ecmascript-proposal-plugin',
    option: {
      classProperties: true,
      objectRestSpread: true
    }
  }, {
    name: 'esdoc-jsx-plugin'
  }, {
    name: 'esdoc-importpath-plugin',
    option: {
      replaces: [],
      stripPackageName: true
    }
  }],
  source: './src'
};
