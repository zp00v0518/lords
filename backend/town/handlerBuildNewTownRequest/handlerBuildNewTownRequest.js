const { checkSchema, formatIdToCoords } = require('../../template_modules');
const { redirectMessage, sendWSMessage } = require('../../wsServer');

function handlerBuildNewTownRequest(message, info) {
  const data = message.data;
  const { ws } = info.player;
  sendWSMessage(ws, message);
}
module.exports = handlerBuildNewTownRequest;
