module.exports = {
  collectCoverage: true,
  coverageDirectory: 'dist/coverage',
  transform: {
    '^.+\\.js?$': 'babel-jest'
  }
};
