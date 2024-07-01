import { recursiveLoop } from "../template_modules/index.js";
import { globalCalcUnit } from "../army/index.js";
import { calcStorageNowValue } from "./storage/index.js";
import { updateStateTown } from "./DB/index.js";

function controlStateinTownLoop(sectorsList = [], callback = () => { }) {
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

function iteration(sector, callback = () => { }) {
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

export default controlStateinTownLoop;
