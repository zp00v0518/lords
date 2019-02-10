const { checkSource, checkSchema, redirectMessage, gloss } = require("../tube.js");
const regionLength = gameVariables.numSectionRegionMap;
const mine = gameVariables.mine;

function upgradeBuilding(message, info) {
  const data = message.data;
  const ws = info.player.ws;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const sector = info.player.sectors[data.sectorIndex];
  const building = sector.region[data.building.x][data.building.y].sector;
  if (building.type !== data.building.type) {
    redirectMessage(ws);
    return;
  }
  const response = {
    type: "upgradeBuilding",
    status: true,
    upgrade: false,
    message: ""
  };
  const lang = info.player.user.lang;
  if (building.upgrade.is) {
    response.message = gloss.dialog.isUpgrade[lang];
    ws.send(JSON.stringify(response));
    return;
  }
  const needResources = mine.getResourcesForUpgrade(building.lvl, data.persent);
  const storageName = gameVariables.town.listBuilding[0];
  const storage = sector.town[storageName];
  if (checkSource(needResources, storage.sources)) {
    response.upgrade = true;
    response.message = gloss.dialog.upgradeDone[lang];
    ws.send(JSON.stringify(response));
    return;
  } else {
    response.message = gloss.dialog.notResources[lang];
    ws.send(JSON.stringify(response));
  }
}

module.exports = upgradeBuilding;

const schema = {
  building: { type: "object" },
  type: { type: "string", regExp: /^[a-z]{2,6}$/gi },
  x: { type: "number", min: 0, max: regionLength },
  y: { type: "number", min: 0, max: regionLength },
  persent: { type: "number", min: 0, max: 100 },
  sectorIndex: { type: "number", min: 0 }
};
