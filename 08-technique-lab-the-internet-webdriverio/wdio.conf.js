exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.spec.js'],
  maxInstances: 3,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless', '--disable-gpu'] },
  }],
  logLevel: 'info',
  baseUrl: 'https://the-internet.herokuapp.com',
  waitforTimeout: 10000,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 60000 },
};
