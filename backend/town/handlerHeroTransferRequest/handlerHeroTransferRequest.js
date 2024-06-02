const { redirectMessage, sendWSMessage } = require('../../wsServer');
const { checkSchema } = require('../../template_modules');
const { getHeroesFromDB, heroInActivate } = require('../../heroes/db');
const { getOneTownFromDB, getTownByHero } = require('../../town');
const setEventHeroTransfer = require('./setEventHeroTransfer');

async function handlerHeroTransferRequest(message, info) {
  const data = message.data;
  const { ws } = info.player;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }

  const { heroId } = data;
  const serverName = info.server;
  const response = {
    status: false,
    type: message.type
  };
  try {
    const initSector = await getTownByHero(serverName, heroId);
    if (!initSector) {
      redirectMessage(ws);
      return;
    }
    const targetSector = await getOneTownFromDB(serverName, data.targetSector);
    if (!targetSector || !targetSector.town) {
      redirectMessage(ws);
      return;
    }
    const hero = await getHeroesFromDB(serverName, { heroId });
    if (!hero.active || targetSector.heroes.some(i => i.toString() === hero._id.toString())) {
      redirectMessage(ws);
      return;
    }
    await setEventHeroTransfer(initSector, targetSector, hero);
    await heroInActivate(serverName, hero._id);
    response.status = true;
    sendWSMessage(ws, response);
  } catch (err) {
    console.log(err);
    redirectMessage(ws);
  }
}

const schema = {
  heroId: { type: 'string', regExp: /^.{13,}\b/g },
  targetSector: { type: 'string', regExp: /^.{13,}\b/g }
};
module.exports = handlerHeroTransferRequest;
