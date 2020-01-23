const { checkSchema } = require("../../template_modules");
const { redirectMessage } = require("../../wsServer");
const {getHeroesFromDB} = require('../../heroes/db');

function handlerMergeArmy(message, info) {
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
  const heroId = data.id;
  const heroes_in_town = sector.heroes;
  if (!heroes_in_town || !heroes_in_town.some(i => i.toString() === heroId)){
    redirectMessage(ws);
  }
  const {server} = info;

  // const army_in_town = town.army.units;
  getHeroesFromDB(server, {heroId}).then(hero => {
    const army_hero = hero.army;
    response.res = res;
    response.message = message;
      ws.send(JSON.stringify(response));

  }).catch(err => {
    redirectMessage(ws);
  })
}

const schema = {
  id: { type: "string", regExp: /.{13,}/g },
  way: { type: "string", regExp: /^in$|^out$/g },
  sectorIndex: { type: "number", min: 0 }
};

module.exports = handlerMergeArmy;
