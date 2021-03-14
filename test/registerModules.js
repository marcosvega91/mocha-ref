const path = require("path");

require('@babel/register')({
  configFile: path.normalize(`${__dirname}/../babel.config.js`),
  ignore: ['/node_modules'],
});
require('ignore-styles');
require('isomorphic-fetch');
require('localstorage-polyfill');
require('jsdom-global/register');
