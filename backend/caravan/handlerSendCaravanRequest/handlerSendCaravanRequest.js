const { checkSchema } = require('../../template_modules');
const { redirectMessage, sendWSMessage } = require('../../wsServer');
const mapLength = require('../../variables/game_variables').numSectionGlobalMap;
const resourcesTypes = require('../../resources/type_resources');
const { getTownByCoords, getOneTownFromDB, updateStateTown } = require('../../town/DB');
const { Caravan } = require('../../caravan');
// const {createCaravanEvent} = require('../../events/createEvents');
const { setEventInGame, createCaravanEvent } = require('../../events');
const { deleteSource } = require('../../resources');
const addBusyCaravan = require('../addBusyCaravan');
const getInfoForStartGame = require('../../user/getInfoForStartGame');

async function handlerSendCaravanRequest(message, info) {
  const data = message.data;
  const { ws } = info.player;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const serverName = info.server;

  const initSector = await getOneTownFromDB(serverName, data.initSector);
  const targetSector = await getTownByCoords(serverName, data.targetSector.x, data.targetSector.y);
  if (!initSector || !targetSector) {
    redirectMessage(ws);
    return;
  }

  const { payload } = data;
  const initTown = initSector.town;
  // одновременная проверка на вместимость каравана и наличие ресурсов на складе
  const flag = Object.keys(initTown.storage.sources).every(type => {
    const sendValue = payload[type];
    const checkValue = Caravan.checkAvailable(sendValue, type, initTown);
    return sendValue === checkValue;
  });
  if (!flag) {
    redirectMessage(ws);
    return;
  }
  const caravanEvent = createCaravanEvent(initSector, targetSector, payload);
  await setEventInGame(caravanEvent, serverName);
  deleteSource(payload, initTown.storage);
  addBusyCaravan(initTown.caravan, payload);
  await updateStateTown(initSector);
  const infoForgame = await getInfoForStartGame({ _id: initSector.userId }, serverName);
  const response = {
    status: true,
    type: message.type,
    infoForgame
  };
  sendWSMessage(ws, response);
}

const schema = {
  initSector: { type: 'string', regExp: /^.{13,}\b/g },
  targetSector: {
    type: 'object',
    fields: {
      x: { type: 'number', min: 0, max: mapLength },
      y: { type: 'number', min: 0, max: mapLength }
    }
  },
  payload: {
    type: 'object',
    fields: {
      [resourcesTypes.gold]: { type: 'number', min: 0, max: 999999 },
      [resourcesTypes.wood]: { type: 'number', min: 0, max: 99 },
      [resourcesTypes.ore]: { type: 'number', min: 0, max: 99 },
      [resourcesTypes.sulfur]: { type: 'number', min: 0, max: 99 },
      [resourcesTypes.crystal]: { type: 'number', min: 0, max: 99 },
      [resourcesTypes.mercury]: { type: 'number', min: 0, max: 99 },
      [resourcesTypes.gem]: { type: 'number', min: 0, max: 99 }
    }
  }
};
module.exports = handlerSendCaravanRequest;
