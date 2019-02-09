const { checkSource, checkSchema, redirectMessage, gloss } = require("../tube.js");
const regionLength = gameVariables.numSectionRegionMap;

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
  const lang = info.player.user.lang;
  if (building.upgrade.is) {
    const response = {
      type: "upgradeBuilding",
      status: true,
      upgrade: false,
      message: gloss.dialog.isUpgrade[lang]
    };
    ws.send(JSON.stringify(response));
    return;
  }
  
  // ws.send(JSON.stringify(message));
  // ws.send(JSON.stringify(info));
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
