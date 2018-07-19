require('child_process').execSync('rm -rf dist/**/*', { stdio: 'inherit' });

require('@babel/register')();

module.exports = [
  require('./build/node'),
  require('./build/web')
];
