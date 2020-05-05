'use strict'
const config = require('../backEnd/config/config');

module.exports = {
  NODE_ENV: '"production"',
  WSPORT: config.server.port.ws,
}
