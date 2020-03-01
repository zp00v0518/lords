const { checkSchema, formatIdToCoords } = require('../../template_modules');
const { redirectMessage } = require('../../wsServer');
const verification = require('../../wsServer/baseVerificationHandler');
const { Region } = require('../../region');
const createEventBattle = require('./createEventBattle');
const { setEventInGame } = require('../../events');
const { getOneTownFromDB } = require('../../town');

function handlerBattleRequest(message, info) {
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

  getOneTownFromDB(curSector._id, curSector.serverName).then(res => {
    const sector = res;
    const { attackHeroId } = data;
    const heroVerif = verification.hero(attackHeroId, sector, info);
    if (!heroVerif.is) {
      redirectMessage(ws);
    }

    const { hero } = heroVerif;
    const coords = formatIdToCoords(data.tileId, gameVariables.numSectionRegionMap);
    const { region } = sector;
    const tile = region[coords.x][coords.y];
    if (tile.type !== Region.types.forest.id) {
      redirectMessage(ws);
      return;
    }
    if (!tile.army || tile.army.length === 0) {
      redirectMessage(ws);
      return;
    }
    const attackArmyForBattle = createArmyForBattle(data.army, hero.army);
    if (!attackArmyForBattle.is) {
      redirectMessage(ws);
      return;
    }
    let townSector = {};
    for (let i = 0; i < region.length; i++) {
      const row = region[i];
      const f = row.find(item => item.type === Region.types.town.id);
      if (f) {
        townSector = f;
        break;
      }
    }

    const event = createEventBattle({
      startCoords: { x: townSector.x, y: townSector.y },
      endCoords: coords,
      army: attackArmyForBattle,
      initSector: sector
    });
    setEventInGame(event, info.server);
  });
}

module.exports = handlerBattleRequest;

const schema = {
  attackHeroId: { type: 'string', regExp: /^.{13,}\b/g },
  target: { type: 'string', regExp: /^.{3,25}\b/g },
  sectorIndex: { type: 'number', min: 0 },
  tileId: {
    type: 'number',
    min: 0,
    // eslint-disable-next-line
    max: Math.pow(gameVariables.numSectionRegionMap, 2)
  },
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

function createArmyForBattle(attackArmy, heroArmy) {
  const result = [];
  const template = {
    is: false
  };
  const flag = attackArmy.every(a => {
    const d = heroArmy.find(x => a.name === x.name && a.race === x.race);
    if (!d) return false;
    result.push(d);
    return true;
  });
  if (flag) {
    template.army = JSON.parse(JSON.stringify(result));
    template.is = true;
  }
  return template;
}
