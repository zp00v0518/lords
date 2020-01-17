// const { checkSchema, redirectMessage, gloss } = require('../../tube');
const { checkSchema } = require("../template_modules");
const { redirectMessage } = require("../wsServer");
const { Race } = require("../race");
const { Army, createStackItemTemplate } = require("./army");
const { checkSource } = require("../resources");
const checkUnitInBarraks = require("./checkUnitInBarraks");

function handlerBuyUnits(message, info) {
  console.log(arguments.callee.name);
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
  const sector = info.player.sectors[data.sectorIndex];
  if (!sector) {
    redirectMessage(ws);
    return;
  }
  const { town } = sector;
  const army_in_town = town.army;

  if (army_in_town.units.length >= Army.army_length + 1) {
    redirectMessage(ws);
    // ws.send(JSON.stringify(response));
    return;
  }
  const { unitName, hiring } = data;
  const raceName = Race.typeList[town.race];
  const unitInfo = Army.getUnitInfo(raceName, unitName);

  if (!unitInfo) {
    redirectMessage(ws);
    return;
  }
  const totalCost = Army.getTotalCost(unitInfo.cost, hiring);
  const storage = town.storage.sources;
  if (!checkSource(totalCost, storage)) {
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
  const stackItemTemplate = Object.assign(createStackItemTemplate(), unitInfo);
  stackItemTemplate.count = hiring;
  // const unitForMerge = {
  //   name: unitName,
  //   count: hiring,
  // };
  const test = JSON.parse(JSON.stringify(army_in_town.units));
  const result = Army.mergeTwoArmy(test, [stackItemTemplate]);
  response.result = result;
  response.unit = unitInfo;
  response.unitOne = Army.getOneUnitFromRace(unitInfo.race, unitInfo.name);
  ws.send(JSON.stringify(response));
}

module.exports = handlerBuyUnits;

function checkUnitInArmy(unitName, army) {
  return army.some(unit => {
    unit.name === unitName;
  });
}
const schema = {
  hiring: { type: "number", min: 1, max: 9999999 },
  unitName: { type: "string", regExp: /^[a-z0-9_]{1,30}/gi },
  sectorIndex: { type: "number", min: 0 }
};
