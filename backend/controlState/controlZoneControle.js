const template = require('template_func');
const console = new template.Log(__filename);
const serverList = global.gameVariables ? global.gameVariables.serverList : [];
const { clearAllBusySectors, removeOldContolValuesFromDB } = require('../zoneControl/db');
const { calculateMediumWeight, setZoneControl } = require('../zoneControl/methods');
const { getAllTownsFromDB } = require('../town/DB');
const { getUsersBySectorsArr } = require('../user/db');

async function controlZoneControle() {
  serverList.forEach(async item => {
    const serverName = item.collectionName;
    await clearAllBusySectors(serverName);
    const allSectors = await getAllTownsFromDB(serverName);
    const userList = await getUsersBySectorsArr(allSectors);
    allSectors.forEach(async sector => {
      const { control, _id } = sector;
      let mediumWeight = calculateMediumWeight(control.values);
      mediumWeight = mediumWeight !== 0 ? mediumWeight : control.lastValue;
      await removeOldContolValuesFromDB(serverName, _id, control.values);
      const user = userList[sector.userId];
      const center = {
        x: sector.x,
        y: sector.y
      };
      await setZoneControl(serverName, mediumWeight, center, user);
    });
  });
}
module.exports = controlZoneControle;
