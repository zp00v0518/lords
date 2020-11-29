const template = require('template_func');
const console = new template.Log(__filename);
const serverList = global.gameVariables ? global.gameVariables.serverList : [];
const { clearAllBusySectors } = require('../zoneControl/db');
const { calculateMediumWeight } = require('../zoneControl/methods');
const { getAllTownsFromDB } = require('../town/DB');

async function controlZoneControle() {
  serverList.forEach(async item => {
    const serverName = item.collectionName;
    await clearAllBusySectors(serverName);
    const allSectors = await getAllTownsFromDB(serverName);
    const userList = {};
    // TODO: остановился на формировании и записи в базу зоны контроля для конкретного города
    // для этого мне нужно знать цвет юзера.
    allSectors.forEach(sector => {
      const mediumWeight = calculateMediumWeight(sector.control.values);
      console.log(mediumWeight);
    });
  });
}

module.exports = controlZoneControle;
