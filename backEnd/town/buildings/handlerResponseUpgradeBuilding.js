const {
  checkSource,
  checkSchema,
  redirectMessage,
  gloss
} = require('../../tube');
const { Race } = require('../../race');

function handlerResponseUpgradeBuilding(message, info) {
  const data = message.data;
  const ws = info.player.ws;

  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }

  const sector = info.player.sectors[data.sectorIndex];
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
    ws.send(JSON.stringify(response));
    return;
  }
  const price = build_for_upgrade.price;
  const storage = sector.town.storage.sources;
  const qwer = {
    message,
    info,
    building,
    race,
    sector,
    gloss
  };
  if (checkSource(price, storage)) {
    ws.send(JSON.stringify(qwer));
  } else {
    response.message = gloss.dialog.notResources[lang];
    ws.send(JSON.stringify(response));
  }
}

module.exports = handlerResponseUpgradeBuilding;

const schema = {
  building: { type: 'object' },
  type: { type: 'string', regExp: /^[a-z_0-9]{4,9}$/gi },
  persent: { type: 'number', min: 70, max: 130 },
  sectorIndex: { type: 'number', min: 0 }
};
