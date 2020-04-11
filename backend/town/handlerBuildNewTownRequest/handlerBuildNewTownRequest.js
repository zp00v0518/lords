const { checkSchema } = require('../../template_modules');
const { redirectMessage, sendWSMessage } = require('../../wsServer');
const { getOneTownFromDB } = require('../../town');


function handlerBuildNewTownRequest(message, info) {
  const data = message.data;
  const { ws } = info.player;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const curSector = info.player.sectors[data.sectorIndex];
  if (!curSector) {
    redirectMessage(ws);
    return;
	}
	const { serverName } = curSector;
	const response = {
    status: false,
		type: message.type,
		data: {},
  };
	getOneTownFromDB(serverName, data.targetSector).then(targetSector => {
		response.data.targetSector = targetSector;

		sendWSMessage(ws, response);
	})
}

const schema = {
  heroId: { type: 'string', regExp: /^.{13,}\b/g },
  targetSector: { type: 'string', regExp: /^.{13,}\b/g },
  sectorIndex: { type: 'number', min: 0 }
};
module.exports = handlerBuildNewTownRequest;
