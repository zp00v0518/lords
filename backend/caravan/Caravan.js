const createAvailable = require('./createAvailable');
const config = require('../config/config.js');
const game_variables = require('../variables/game_variables');
const getShortDistanceOnMap = require('../globalMap/getShortDistanceOnMap');

const Caravan = {
  available: createAvailable(),
  speed: (config.time.minute * 5) / config.time.speedGame,
  mapSize: game_variables.numSectionGlobalMap,
  checkAvailable(value, type, town) {
    const { available } = this;
    const { storage, caravan } = town;
    let curValue = value;
    const nowValue = ~~storage.sources[type].nowValue;
    curValue = curValue >= nowValue ? nowValue : curValue;
    const max = available[type] - caravan[type];
    curValue = curValue >= max ? max : curValue;
    return curValue;
  },
  getTimeMoveCaravanOnMap(init, target, options = {}) {
    const x1 = init.x;
    const y1 = init.y;
    const x2 = target.x;
    const y2 = target.y;
    const distance = this.getShortDistanceOnMap(x1, y1, x2, y2, this.mapSize);
    const time = distance * this.speed;
    return Math.round(time);
  },
  getShortDistanceOnMap
};

module.exports = Caravan;
