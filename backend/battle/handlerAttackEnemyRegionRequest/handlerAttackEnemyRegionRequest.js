const { gameVariables } = global;
const { redirectMessage, sendWSMessage } = require('../../wsServer');
const { checkSchema, formatIdToCoords } = require('../../template_modules');
const { getUsersTownFromDB, getOneTownFromDB } = require('../../town');
const { createArmyForBattle } = require('../../army');
const { getHeroesFromDB, updateHeroInDB } = require('../../heroes/db');
const createEventBattle = require('../handlerBattleRequest/createEventBattle');
const { Event, setEventInGame } = require('../../events');

async function handlerAttackEnemyRegionRequest(message, info) {
  const { ws } = info.player;
  if (!ws) return;
  const data = message.data;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }

  const userId = info.player.user ? info.player.user._id : '';
  if (!userId) {
    redirectMessage(ws);
    return;
  }
  const serverName = info.server;
  const targetTown = await getOneTownFromDB(serverName, data.tileId);
  if (!targetTown) {
    redirectMessage(ws);
    return;
  }
  const userTowns = await getUsersTownFromDB(userId, serverName);
  if (userTowns.find(i => i._id === targetTown._id)) {
    redirectMessage(ws);
    return;
  }

  const curSector = userTowns.find(i => i._id.toString() === data.startSectorId);
  if (!curSector) {
    redirectMessage(ws);
    return;
  }
  const heroId = data.attackHeroId;
  const heroes_in_town = curSector.heroes;
  if (!heroes_in_town || !heroes_in_town.some(i => i.toString() === heroId)) {
    redirectMessage(ws);
    return;
  }
  const hero = await getHeroesFromDB(serverName, { heroId });
  if (!hero.active) {
    redirectMessage(ws);
    return;
  }

  const attackArmyForBattle = createArmyForBattle(data.army, hero.army);
  if (!attackArmyForBattle.is) {
    redirectMessage(ws);
    return;
  }
  const coords = formatIdToCoords(data.targetId, gameVariables.numSectionRegionMap);
  const event = createEventBattle({
    startCoords: { x: curSector.x, y: curSector.y },
    endCoords: { x: targetTown.x, y: targetTown.y },
    army: attackArmyForBattle,
    initSector: curSector,
    initHero: hero,
    targetSector: targetTown,
    map: 'world'
  });
  event.mode = Event.mode.global;
  event.data.goal = {};
  event.data.goal.target = 'region';
  event.data.goal.coords = coords;
  await setEventInGame(event, info.server);
  await updateHeroInDB(serverName, hero._id, { active: false });
  sendWSMessage(ws, event);
}

module.exports = handlerAttackEnemyRegionRequest;

const schema = {
  attackHeroId: { type: 'string', regExp: /^.{13,}\b/g },
  targetId: {
    type: 'number',
    min: 0,
    // eslint-disable-next-line
    max: Math.pow(gameVariables.numSectionRegionMap, 2) - 1
  },
  startSectorId: { type: 'string', regExp: /^.{13,}\b/g },
  tileId: { type: 'string', regExp: /^.{13,}\b/g },
  army: {
    type: 'array',
    all: {
      type: 'object',
      fields: {
        race: { type: 'string', regExp: /^.{3,25}\b/g },
        name: { type: 'string', regExp: /^.{3,25}\b/g },
        count: { type: 'number', min: 1 }
      }
    }
  }
};
