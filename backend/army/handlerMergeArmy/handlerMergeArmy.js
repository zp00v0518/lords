const { checkSchema } = require("../../template_modules");
const { redirectMessage } = require("../../wsServer");
const { Army } = require("../Army");
// const { getHeroesFromDB } = require("../../heroes/db");

function handlerMergeArmy(message, info) {
  const data = message.data;
  const { ws } = info.player;
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
  const heroId = data.id;
  const heroes_in_town = sector.heroes;
  if (!heroes_in_town || !heroes_in_town.some(i => i.toString() === heroId)) {
    redirectMessage(ws);
    return;
  }
  const { heroesList } = info.player;
  const hero = heroesList.find(i => i._id.toString() === heroId);
  if (!hero) {
    redirectMessage(ws);
    return;
  }
  const army_hero = hero.army;
  const army_in_town = sector.town.army.units;
  let mergeResult;
  const mergeWay = data.way;
  if (mergeWay === "in") {
    mergeResult = Army.mergeTwoArmy(army_hero, army_in_town);
  }
  response.res = hero;
  response.mergeResult = mergeResult;
  ws.send(JSON.stringify(response));

}

const schema = {
  id: { type: "string", regExp: /.{13,}/g },
  way: { type: "string", regExp: /^in$|^out$/g },
  sectorIndex: { type: "number", min: 0 }
};

module.exports = handlerMergeArmy;
