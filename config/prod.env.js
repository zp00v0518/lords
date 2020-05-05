'use strict'
const config = require('../backend/config/config');

module.exports = {
  NODE_ENV: '"production"',
  WSPORT: config.server.port.ws,
}
