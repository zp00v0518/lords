const { recursiveLoop } = require("../template_modules");
const { globalCalcUnit } = require("../army");
const { calcStorageNowValue } = require("./storage");
const updateStateTown = require("./updateStateTown");

function controlStateinTownLoop(sectorsList = [], callback = () => {}) {
  return new Promise((resolve, reject) => {
    if (sectorsList.length === 0) {
      callback();
      return resolve();
    }
    recursiveLoop(0, sectorsList, iteration, (err, result) => {
      if (err) {
        callback();
        return reject(err);
      }
      callback(result);
      return resolve(result);
    });
  });
}

function iteration(sector, callback = () => {}) {
  return new Promise((resolve, reject) => {
    calcStorageNowValue(sector.town.storage);
    globalCalcUnit(sector.town);
    updateStateTown(sector)
      .then(() => {
        callback(null);
        return resolve();
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

module.exports = controlStateinTownLoop;
