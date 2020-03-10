const { Race } = require('../../race');
const { Army, createStackItemTemplate } = require('../../army');
const { updateDB } = require('../../workWithMongoDB');
const update = new updateDB();

function finish_hiring_units(eventData, sector, callback = () => {}) {
  return new Promise((resolve, reject) => {
    const { data, serverName } = eventData;
    const { unitName, count, unitRace } = data;
    const raceName = Race.typeList[unitRace];
    const unitInfo = Army.getUnitInfo(unitName, raceName);
    const stackItemTemplate = Object.assign(createStackItemTemplate(), unitInfo);
    stackItemTemplate.count = count;
    const army_in_town = sector.town.army.units;
    Army.mergeTwoArmy(army_in_town, [stackItemTemplate]);
    const optionsForUpdate = {
      collectionName: serverName,
      filtr: { _id: eventData._id },
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
  });
}

module.exports = finish_hiring_units;
