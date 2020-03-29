const { checkSource, checkSchema, redirectMessage, gloss, deleteSource, setUpgradeChange } = require('../tube.js');
const regionLength = global.gameVariables.numSectionRegionMap;
const mine = require('./mine/Mine');
const { sendWSMessage } = require('../wsServer');
const { formEventsList } = require('../events');
const { updateStateRegion } = require('../region');
const { getOneTownFromDB, updateStateTown } = require('../town');

function handlerResponseUpgradeRegion(message, info) {
  const data = message.data;
  const ws = info.player.ws;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const curSector = info.player.sectors[data.sectorIndex];
  if (!curSector) {
    redirectMessage(ws);
    return;
  }
  getOneTownFromDB(curSector.serverName, curSector._id).then(res => {
    const sector = res;
    const building = sector.region[data.building.x][data.building.y].sector;
    if (building.type !== data.building.type) {
      redirectMessage(ws);
      return;
    }
    const response = {
      type: 'upgradeBuilding',
      status: true,
      upgrade: false,
      message: ''
    };
    const lang = info.player.user.lang;
    if (building.upgrade.is) {
      response.message = gloss.dialog.isUpgrade[lang];
      sendWSMessage(ws, response);
      return;
    }
    const needResources = mine.getResourcesForUpgrade(building.lvl, data.persent);
    if (!needResources) {
      response.message = gloss.dialog.maxLvl[lang];
      sendWSMessage(ws, response);
      return;
    }
    const storageName = global.gameVariables.classInstance.storage;
    const storage = sector.town[storageName];
    if (checkSource(needResources, storage.sources)) {
      const cell = sector.region[data.building.x][data.building.y];
      setUpgradeChange(cell, data.persent, sector, info)
        .then(() => {
          const userId = info.player.user._id;
          const serverName = info.server;
          response.storage = deleteSource(needResources, storage);
          updateStateRegion(sector).then(() => {
            updateStateTown(sector).then(() => {
              formEventsList(userId, serverName).then(listEvents => {
                response.upgrade = true;
                response.message = gloss.dialog.upgradeDone[lang];
                response.sectorIndex = data.sectorIndex;
                response.eventsList = listEvents;
                sendWSMessage(ws, response);
              });
            });
          });
        })
        .catch(err => console.log(err));
    } else {
      response.message = gloss.dialog.notResources[lang];
      sendWSMessage(ws, response);
    }
  });
}

module.exports = handlerResponseUpgradeRegion;

const schema = {
  building: {
    type: 'object',
    fields: {
      type: { type: 'string', length: [2, 7] },
      x: { type: 'number', min: 0, max: regionLength },
      y: { type: 'number', min: 0, max: regionLength }
    }
  },
  persent: { type: 'number', min: 70, max: 130 },
  sectorIndex: { type: 'number', min: 0 }
};
