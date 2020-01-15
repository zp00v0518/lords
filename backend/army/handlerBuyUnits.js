// const { checkSchema, redirectMessage, gloss } = require('../../tube');
const { checkSchema } = require("../template_modules");
const { redirectMessage } = require("../wsServer");

function handlerBuyUnits(message, info) {
  console.log(arguments.callee.name);
  const data = message.data;
  const ws = info.player.ws;
  const response = {
    status: false,
    type: message.type
  };
  if (!checkSchema(data, schema)) {
    redirectMessage(response);
    return;
  }
  const sector = info.player.sectors[data.sectorIndex];
  if (!sector) {
    redirectMessage(response);
    return;
  }
  const army_in_town = sector.town.army;
  response.status = true;
  response.buy = {};
  if (army_in_town.units.length >= 7) {
    response.buy.is = false;
    response.buy.status = 'full_army_in_town';
    ws.send(JSON.stringify(response));
    return;
  }
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
