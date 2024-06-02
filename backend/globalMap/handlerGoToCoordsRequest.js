const { checkSchema } = require('../template_modules');
const { redirectMessage, sendWSMessage } = require('../wsServer');
const mapLength = require('../variables/game_variables').numSectionGlobalMap;
const getGlobalMapSector = require('../globalMap/getGlobalMapSector');

async function handlerGoToCoordsRequest(message, info) {
  const data = message.data;
  const { player, server } = info;

  const { ws, user } = player;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  user.globalMap.centerMap.x = data.x;
  user.globalMap.centerMap.y = data.y;
  const result = getGlobalMapSector(user, server);
  const response = {
    type: message.type,
    status: true,
    currentMap: result
  };
  sendWSMessage(ws, response);
}

const schema = {
  x: { type: 'number', min: 0, max: mapLength },
  y: { type: 'number', min: 0, max: mapLength }
};

module.exports = handlerGoToCoordsRequest;
