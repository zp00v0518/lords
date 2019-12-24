const Mine = gameVariables.mine;
const { updateDB } = require('../../tube.js');
const update = new updateDB();

function fixingResultUpgradeMine(mine, eventItem) {
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
    update.one(optionsForUpdate).then(result => {});
  }
}

module.exports = fixingResultUpgradeMine;
