module.exports = {
  collectCoverage: true,
  coverageDirectory: 'dist/coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.js?$': 'babel-jest'
  }
};
