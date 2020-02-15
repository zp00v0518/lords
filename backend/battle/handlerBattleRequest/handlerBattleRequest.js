const { checkSchema } = require("../../template_modules");
const { redirectMessage } = require("../../wsServer");

function handlerBattleRequest(message, info) {
  const data = message.data;
  const { ws } = info.player;
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);

    // ws.send(JSON.stringify(message));
    return;
  }
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
