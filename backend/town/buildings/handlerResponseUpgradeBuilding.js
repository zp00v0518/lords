const { checkSchema, redirectMessage, gloss } = require('../../tube');
const { Race } = require('../../race');
const { checkSource, deleteSource, Resources } = require('../../resources');
const Town = require('../Town');
const setUpUpgradeChange_building = require('./setUpUpgradeChange_building');
const { sendWSMessage } = require('../../wsServer');
const { formEventsList } = require('../../events');
const { getOneTownFromDB, updateStateTown } = require('../../town');

function handlerResponseUpgradeBuilding(message, info) {
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
    const typeBuilding = data.building.type;
    const raceName = Race.typeList[sector.town.race];
    const race = Race[raceName];
    const building = sector.town[typeBuilding];
    if (!building) {
      redirectMessage(ws);
      return;
    }
    const lvl = building.lvl;
    const build_for_upgrade = race.buildings[typeBuilding].lvl[lvl + 1];
    const response = {
      type: 'upgradeBuilding',
      status: true,
      upgrade: false,
      message: ''
    };
    const lang = info.player.user.lang;
    if (!build_for_upgrade) {
      response.message = gloss.dialog.maxLvl[lang];
      sendWSMessage(ws, response);
      return;
    }
    const price = build_for_upgrade.price;
    const storage = sector.town.storage;
    const persent = data.persent;
    const price_for_upgrade = Town.getResourcesForUpgrade(price, persent);
    if (checkSource(price_for_upgrade, storage.sources)) {
      const time_in_gold = Resources.getInGold(price);
      // const time_in_gold = gameVariables.resources.getInGold(price);
      const sec = global.gameVariables.time.sec;
      const seconds = sec / global.gameVariables.time.speedGame;
      const time_for_upgrade = Town.getTimeForUpgrade(time_in_gold * seconds, persent);
      setUpUpgradeChange_building({ building, time_for_upgrade, sector, info })
        .then(() => {
          response.storage = deleteSource(price_for_upgrade, storage);
          const userId = info.player.user._id;
          const serverName = info.server;
          updateStateTown(sector).then(() => {
            formEventsList(userId, serverName).then(listEvents => {
              response.upgrade = true;
              response.message = gloss.dialog.upgradeDone[lang];
              response.sectorIndex = data.sectorIndex;
              response.eventsList = listEvents;
              sendWSMessage(ws, response);
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

module.exports = handlerResponseUpgradeBuilding;

const schema = {
  building: {
    type: 'object',
    fields: {
      type: { type: 'string', regExp: /^[a-z_0-9]{4,9}$/gi }
    }
  },
  persent: { type: 'number', min: 70, max: 130 },
  sectorIndex: { type: 'number', min: 0 }
};
