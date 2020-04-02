const { checkSchema, formatIdToCoords } = require('../../template_modules');
const { redirectMessage } = require('../../wsServer');
const verification = require('../../wsServer/baseVerificationHandler');
const { Region } = require('../../region');
const createEventBattle = require('./createEventBattle');
const { setEventInGame } = require('../../events');
const { getOneTownFromDB } = require('../../town');
const { sendWSMessage } = require('../../wsServer');
const { updateHeroInDB } = require('../../heroes/db');
const { gameVariables } = global;

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
  const { serverName } = curSector;
  getOneTownFromDB(serverName, curSector._id)
    .then(res => {
      const sector = res;
      const { attackHeroId } = data;
      verification.hero(attackHeroId, sector, info).then(heroVerif => {
        if (!heroVerif.is) {
          redirectMessage(ws);
          return;
        }
        const { hero } = heroVerif;
        if (!hero.active) {
          redirectMessage(ws);
          return;
        }
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
        // console.log(hero)
        const event = createEventBattle({
          startCoords: { x: townSector.x, y: townSector.y },
          endCoords: coords,
          army: attackArmyForBattle,
          initSector: sector,
          initHero: hero
        });
        setEventInGame(event, info.server).then(() => {
          const docUpdateHero = {
            active: false
          };
          updateHeroInDB(serverName, attackHeroId, docUpdateHero).then(() => {
            sendWSMessage(ws, event);
          });
        });
      });
    })
    .catch(() => {
      redirectMessage(ws);
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
