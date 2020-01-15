// const { checkSchema, redirectMessage, gloss } = require('../../tube');
const { checkSchema } = require("../template_modules");
const { redirectMessage } = require("../wsServer");

function handlerBuyUnits(message, info) {
  console.log(arguments.callee.name);
  const data = message.data;
  const ws = info.player.ws;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const sector = info.player.sectors[data.sectorIndex];
  if (!sector) {
    redirectMessage(ws);
    return;
  }
  const army_in_town = sector.town.army;
  console.log(army_in_town);
  if (army_in_town.length >= 7){
    
  }
  ws.send(JSON.stringify(message));
}

module.exports = handlerBuyUnits;

function checkUnitInArmy(unitName, army){
  return army.some(unit => { unit.name === unitName});
}
const schema = {
  hiring: { type: "number", min: 1, max: 9999999 },
  unitName: { type: "string", regExp: /^[a-z0-9_]{1,30}/gi },
  sectorIndex: { type: "number", min: 0 }
};
