const semver = require('semver');
const chalk = require('chalk');
const requiredVersion = (require('../package.json').engines || {}).node || '>=8.9';

function checkNodeVersion (wanted, id) {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ));
    process.exit(1);
  }
}

module.exports = function check() {
  checkNodeVersion(requiredVersion, 'fe')

  if (semver.satisfies(process.version, '9.x')) {
    console.log(chalk.red(
      `You are using Node ${process.version}.\n` +
      `Node.js 9.x has already reached end-of-life and will not be supported in future major releases.\n` +
      `It's strongly recommended to use an active LTS version instead.`
    ));
  }
}
