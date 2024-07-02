import { checkSchema } from '../template_modules/index.js';
import { redirectMessage, sendWSMessage } from '../wsServer/index.js';
import game_variables from '../variables/game_variables';
const mapLength = game_variables.numSectionGlobalMap;
import getGlobalMapSector from '../globalMap/getGlobalMapSector.js';

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

export default handlerGoToCoordsRequest;
