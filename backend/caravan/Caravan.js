const createAvailable = require('./createAvailable');
const config = require('../config/config.js');

const Caravan = {
  available: createAvailable(),
  speed: (config.time.minute * 5) / config.time.speedGame,
  checkAvailable(value, type, town) {
    const { available } = this;
    const { storage, caravan } = town;
    let curValue = value;
    const nowValue = ~~storage.sources[type].nowValue;
    curValue = curValue >= nowValue ? nowValue : curValue;
    const max = available[type] - caravan[type];
    curValue = curValue >= max ? max : curValue;
    return curValue;
  }
};

module.exports = Caravan;
