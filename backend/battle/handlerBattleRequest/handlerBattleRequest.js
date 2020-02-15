const { checkSchema, formatIdToCoords } = require("../../template_modules");
const { redirectMessage } = require("../../wsServer");
const verification = require("../../wsServer/baseVerificationHandler");
const { Region } = require("../../region");

function handlerBattleRequest(message, info) {
  const data = message.data;
  const { ws } = info.player;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const sector = info.player.sectors[data.sectorIndex];
  if (!sector) {
    redirectMessage(ws);
    return;
  }
  const { attackHeroId } = data;
  const heroVerif = verification.hero(attackHeroId, sector, info);
  if (!heroVerif.is) {
    redirectMessage(ws);
  }

  const { hero } = heroVerif;
  const coords = formatIdToCoords(
    data.tileId,
    // eslint-disable-next-line
    gameVariables.numSectionRegionMap
  );
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
	
	

  message.data.hero = hero;
  message.data.attackArmyForBattle = attackArmyForBattle.army;
  message.data.tile = tile;

  ws.send(JSON.stringify(message));
}

module.exports = handlerBattleRequest;

const schema = {
  attackHeroId: { type: "string", regExp: /^.{13,}\b/g },
  target: { type: "string", regExp: /^.{3,25}\b/g },
  sectorIndex: { type: "number", min: 0 },
  tileId: {
    type: "number",
    min: 0,
    // eslint-disable-next-line
    max: Math.pow(gameVariables.numSectionRegionMap, 2)
  },
  army: {
    type: "array",
    all: {
      type: "object",
      fields: {
        race: { type: "string", regExp: /^.{3,25}\b/g },
        name: { type: "string", regExp: /^.{3,25}\b/g },
        count: { type: "number", min: 1 }
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
