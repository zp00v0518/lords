const { checkSource, checkSchema, redirectMessage } = require('../tube.js');

function upgradeBuilding(message, info) {
  const data = message.data;
  const ws = info.player.ws;
  if (!checkSchema(data, schema)){
    redirectMessage(ws)
    return;
  }
  const sectors = info.player.sectors;
  ws.send(JSON.stringify(message))
  ws.send(JSON.stringify(info))
}

module.exports = upgradeBuilding;

const schema = {
  building: 'object',
  type: 'string',
  x: 'number',
  y: 'number',
  persent: 'number',
  sectorIndex: 'number',
};