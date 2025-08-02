module.exports = {
  timeout: 10000,
  reporter: process.env.CI ? 'mochawesome' : 'spec',
  require: ['chai/register-expect'],
  spec: 'tests/api/**/*.test.js',
  recursive: true,
  exit: true,
  'reporter-options': {
    reportDir: 'mochawesome-report',
    reportFilename: 'api-test-report',
    overwrite: true,
    html: true,
    json: true
  }
}; 