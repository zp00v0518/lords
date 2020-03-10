// const { checkSchema, redirectMessage, gloss } = require('../../tube');
const { checkSchema } = require('../../template_modules');
const { redirectMessage } = require('../../wsServer');
const { Race } = require('../../race');
const { Army } = require('./../army');
const { checkSource } = require('../../resources');
const checkUnitInBarraks = require('./../checkUnitInBarraks');
const { deleteSource } = require('../../resources');
const setEventForHiringUnit = require('./setEventForHiringUnit');
const { sendWSMessage } = require('../../wsServer');
const { formEventsList } = require('../../events');
const { getOneTownFromDB, updateStateTown } = require('../../town');

function handlerBuyUnits(message, info) {
  const data = message.data;
  const ws = info.player.ws;
  const response = {
    status: false,
    type: message.type
  };
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const curSector = info.player.sectors[data.sectorIndex];
  if (!curSector) {
    redirectMessage(ws);
    return;
  }

  getOneTownFromDB(curSector._id, curSector.serverName)
    .then(res => {
      const sector = res;
      const { town } = sector;
      const army_in_town = town.army.units;
      const { unitName, hiring } = data;
      const unit_in_town = army_in_town.some(i => i.name === unitName);
      if (army_in_town.length >= Army.army_length && !unit_in_town) {
        redirectMessage(ws);
        // ws.send(JSON.stringify(response));
        return;
      }
      const raceName = Race.typeList[town.race];
      const unitInfo = Army.getUnitInfo(unitName, raceName);
      if (!unitInfo) {
        redirectMessage(ws);
        return;
      }
      const totalCost = Army.getTotalCost(unitInfo.cost, hiring);
      let storage = town.storage;
      if (!checkSource(totalCost, storage.sources)) {
        redirectMessage(ws);
        return;
      }
      response.status = true;
      response.buy = {};
      const barakk_name = unitInfo.building;
      const barrak = town[barakk_name];
      if (!checkUnitInBarraks(barrak, hiring)) {
        response.buy.is = false;
        response.buy.status = 'not_enough_army';
        sendWSMessage(ws, response);
        return;
      }
      const timeHiring = Army.getBaseHiringTime(unitInfo.hp, hiring);
      setEventForHiringUnit({ sector, info, unitName, count: hiring, timeHiring }).then(() => {
        storage = deleteSource(totalCost, storage);
        const userId = info.player.user._id;
        const serverName = info.server;
        barrak.work.nowValue -= hiring;
        updateStateTown(sector).then(() => {
          formEventsList(userId, serverName).then(listEvents => {
            response.eventsList = listEvents;
            sendWSMessage(ws, response);
          });
        });
      });
    })
    .catch(err => {
      response.error = err;
      sendWSMessage(ws, response);
    });
}

module.exports = handlerBuyUnits;

const schema = {
  hiring: { type: 'number', min: 1, max: 9999999 },
  unitName: { type: 'string', regExp: /^[a-z0-9_]{1,30}\b/g },
  sectorIndex: { type: 'number', min: 0 }
};
