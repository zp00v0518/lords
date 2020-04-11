const { checkSchema } = require('../../template_modules');
const { redirectMessage, sendWSMessage } = require('../../wsServer');

function handlerBuildNewTownRequest(message, info) {
  const data = message.data;
  const { ws } = info.player;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
	sendWSMessage(ws, message);
}

const schema = {
  heroId: { type: 'string', regExp: /^.{13,}\b/g },
  targetSector: { type: 'string', regExp: /^.{13,}\b/g },
  sectorIndex: { type: 'number', min: 0 }
};
module.exports = handlerBuildNewTownRequest;
