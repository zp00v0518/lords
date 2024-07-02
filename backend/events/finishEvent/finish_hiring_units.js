import { Race } from '../../race/index.js';
import { Army, createStackItemTemplate } from '../../army/index.js';
import updateDB from '../../workWithMongoDB/updateDB.js';
import { getControlWeightFromArmy } from '../../zoneControl/methods/index.js';
import { setValueInSectorById } from '../../zoneControl/db/index.js';
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

export default finish_hiring_units;
