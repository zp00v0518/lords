const { checkSource, checkSchema, redirectMessage } = require("../tube.js");
const regionLength = gameVariables.numSectionRegionMap;

function upgradeBuilding(message, info) {
  const data = message.data;
  const ws = info.player.ws;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const sector = info.player.sectors[data.sectorIndex];
  const regionSector = sector.region[data.building.x][data.building.y];
  
  ws.send(JSON.stringify(message));
  ws.send(JSON.stringify(info));
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
