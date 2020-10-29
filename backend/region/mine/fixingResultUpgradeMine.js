// const Mine = gameVariables.mine;
const Mine = require('../mine/Mine');
const { updateDB } = require('../../tube.js');
const update = new updateDB();
const { upValueInStorage } = require('../../town/storage');

// TODO: здесь может быть баг, когда шахта не работает после атаки, но в это время закончится улучшение
function fixingResultUpgradeMine(mine, eventItem, sector, callback = () => {}) {
  return new Promise((resolve, reject) => {
    // важно зафиксировать предыдущее число до всех вычеслений
    const workSection = mine.work;
    const previosValue = workSection.addValue;
    mine.upgrade.is = false;
    mine.upgrade.date = 0;
    mine.lvl++;
    workSection.addValue = mine.lvl * Mine.valueMining[mine.type];
    // workSection.is = true;
    const storage = sector.town.storage;
    if (eventItem) {
      const optionsForUpdate = {
        collectionName: eventItem.serverName,
        filtr: { _id: eventItem._id },
        updateDoc: { $set: { status: false } }
      };
      update
        .one(optionsForUpdate)
        .then(result => {
          if (workSection.is) {
            const dif = mine.work.addValue - previosValue;
            upValueInStorage(mine.type, dif, storage);
          }
          optionsForUpdate.filtr = { _id: sector._id };
          optionsForUpdate.updateDoc = sector;
          update.replaceOne(optionsForUpdate).then(resultReplace => {
            callback(null, result);
            return resolve(result);
          });
        })
        .catch(err => {
          callback(err);
          return reject(err);
        });
    }
  });
}

module.exports = fixingResultUpgradeMine;
