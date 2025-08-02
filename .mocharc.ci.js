module.exports = {
  timeout: 10000,
  reporter: 'mochawesome',
  require: ['chai/register-expect'],
  spec: 'tests/api/**/*.test.js',
  recursive: true,
  exit: true,
  'reporter-options': {
    reportDir: 'mochawesome-report',
    reportFilename: 'api-test-report',
    overwrite: true,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'API Test Report - Loja da Leda LTDA',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  }
}; 