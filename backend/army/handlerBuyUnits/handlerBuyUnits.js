// const { checkSchema, redirectMessage, gloss } = require('../../tube');
const { checkSchema } = require("../../template_modules");
const { redirectMessage } = require("../../wsServer");
const { Race } = require("../../race");
const { Army, createStackItemTemplate } = require("./../army");
const { checkSource } = require("../../resources");
const checkUnitInBarraks = require("./../checkUnitInBarraks");
const { deleteSource } = require("../../resources");
const setEventForHiringUnit = require("./setEventForHiringUnit");

function handlerBuyUnits(message, info) {
  const data = message.data;
  const ws = info.player.ws;
  const response = {
    status: false,
    type: message.type,
    info
  };
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const sector = info.player.sectors[data.sectorIndex];
  if (!sector) {
    redirectMessage(ws);
    return;
  }
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
  const unitInfo = Army.getUnitInfo(raceName, unitName);
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
    response.buy.status = "not_enough_army";
    ws.send(JSON.stringify(response));
    return;
  }
  const timeHiring = Army.getBaseHiringTime(unitInfo.hp, hiring);
  setEventForHiringUnit({ sector, info, unitName, count: hiring, timeHiring })
    .then(() => {
      storage = deleteSource(totalCost, storage);
      barrak.work.nowValue -= hiring;
      ws.send(JSON.stringify(response));
    })
    .catch(err => {
      response.error = err;
      ws.send(JSON.stringify(response));
    });
}

module.exports = handlerBuyUnits;

const schema = {
  hiring: { type: "number", min: 1, max: 9999999 },
  unitName: { type: "string", regExp: /^[a-z0-9_]{1,30}/g },
  sectorIndex: { type: "number", min: 0 }
};