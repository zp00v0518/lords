const createAvailable = require('./createAvailable');
const config = require('../config/config.js');

const Caravan = {
  available: createAvailable(),
  speed: (config.time.minute * 5) / config.time.speedGame
};

module.exports = Caravan;
