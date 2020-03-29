const { checkSchema } = require('../../template_modules');
const { redirectMessage, sendWSMessage } = require('../../wsServer');
const { getOneTownFromDB } = require('../../town');

function updateArmyOnRegion(message, info) {
  const data = message.data;
  const { ws } = info.player;
  const response = {
    status: true,
    type: message.type
  };
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const curSector = info.player.sectors[data.sectorIndex];
  if (!curSector) {
    redirectMessage(ws);
    return;
	}
	getOneTownFromDB(curSector._id, curSector.serverName)
  sendWSMessage(ws, response);
}

const schema = {
  sectorIndex: { type: 'number', min: 0 },
  armySize: { type: 'number', min: 0, max: 999999 }
};
module.exports = updateArmyOnRegion;
