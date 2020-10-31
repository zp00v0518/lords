'use strict';
const config = require('../backend/config/config');
require('dotenv').config();

const prodEnv = {
  NODE_ENV: '"production"',
  WSPORT: config.server.port.ws,
  SPEED: process.env.SPEED,
};
module.exports = prodEnv;
