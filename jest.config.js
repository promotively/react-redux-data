module.exports = {
  collectCoverage: true,
  coverageDirectory: 'dist/coverage',
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-tree-walker)/'
  ]
};
