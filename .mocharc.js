module.exports = {
  timeout: 10000,
  exit: true,
  reporter: process.env.CI ? 'mochawesome' : 'spec',
  'reporter-options': process.env.CI ? {
    reportDir: 'mochawesome-report',
    reportFilename: 'api-test-report',
    quiet: true
  } : {}
}; 