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
    // TODO: остановился на формировании и записи в базу зоны контроля для конкретного города
    // для этого мне нужно знать цвет юзера.
    allSectors.forEach(async sector => {
      const { control, _id } = sector;
      const mediumWeight = calculateMediumWeight(control.values);
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
