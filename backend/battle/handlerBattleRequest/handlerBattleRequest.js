const { checkSchema } = require("../../template_modules");
const { redirectMessage } = require("../../wsServer");
const verification = require("../../wsServer/baseVerificationHandler");

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
  message.data.hero = hero;

  ws.send(JSON.stringify(message));
}

module.exports = handlerBattleRequest;

const schema = {
  attackHeroId: { type: "string", regExp: /^.{13,}\b/g },
  target: { type: "string", regExp: /^.{3,25}\b/g },
  sectorIndex: { type: "number", min: 0 },
  tileId: { type: "number", min: 0 },
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
