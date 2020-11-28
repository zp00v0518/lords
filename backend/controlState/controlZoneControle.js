const template = require('template_func');
const console = new template.Log(__filename);
const serverList = global.gameVariables ? global.gameVariables.serverList : [];
const { clearAllBusySectors } = require('../zoneControl/db');

async function controlZoneControle() {
  serverList.forEach(async item => {
    const serverName = item.collectionName;
    // TODO: остановлся над работой создания м етода, который бы очищал все занятые сектора
    await clearAllBusySectors(serverName);
  });
}

module.exports = controlZoneControle;
