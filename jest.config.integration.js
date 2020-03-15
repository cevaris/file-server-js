const config = require('./jest.config');

// override jest unit test regex
config.testRegex = '(/__tests__/.*|(\\.|/)(integration))\\.tsx?$',
module.exports = config;

console.log('RUNNING INTEGRATION TESTS')