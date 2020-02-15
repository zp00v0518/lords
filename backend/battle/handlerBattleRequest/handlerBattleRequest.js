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
  attackHeroId: { type: "string", regExp: /.{13,}/g },
  target: { type: "string", regExp: /.{10,}/g },
  sectorIndex: { type: "number", min: 0 }
};
