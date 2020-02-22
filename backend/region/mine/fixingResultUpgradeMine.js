// const Mine = gameVariables.mine;
const Mine = require("../mine/Mine");
const { updateDB } = require("../../tube.js");
const update = new updateDB();

function fixingResultUpgradeMine(mine, eventItem, callback = () => {}) {
  return new Promise((resolve, reject) => {
    mine.upgrade.is = false;
    mine.lvl++;
    mine.work.addValue = mine.lvl * Mine.valueMining[mine.type];
    mine.upgrade.date = 0;
    if (eventItem) {
      const optionsForUpdate = {
        collectionName: eventItem.serverName,
        filtr: { _id: eventItem._id },
        updateDoc: { $set: { status: false } }
      };
      update
        .one(optionsForUpdate)
        .then(result => {
          callback(null, result);
          return resolve(result);
        })
        .catch(err => {
          callback(err);
          return reject(err);
        });
    }
  });
}

module.exports = fixingResultUpgradeMine;
