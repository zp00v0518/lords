const { Race } = require('../../race');
const { Army, createStackItemTemplate } = require('../../army');
const { updateDB } = require('../../workWithMongoDB');
const { getControlWeightFromArmy } = require('../../zoneControl/methods');
const { setValueInSectorById } = require('../../zoneControl/db');
const update = new updateDB();

async function finish_hiring_units(eventData, sector) {
  const { data, serverName } = eventData;
  const { unitName, count, unitRace } = data;
  const raceName = Race.typeList[unitRace];
  const unitInfo = Army.getUnitInfo(unitName, raceName);
  const stackItemTemplate = Object.assign(createStackItemTemplate(), unitInfo);
  stackItemTemplate.count = count;
  const weight = getControlWeightFromArmy([stackItemTemplate]);
  await setValueInSectorById(serverName, sector._id, weight);
  const army_in_town = sector.town.army.units;
  Army.mergeTwoArmy(army_in_town, [stackItemTemplate]);
  const optionsForUpdate = {
    collectionName: serverName,
    filtr: { _id: eventData._id },
    updateDoc: { $set: { status: false } }
  };
  const result = await update.one(optionsForUpdate);
  return result;
}

module.exports = finish_hiring_units;
