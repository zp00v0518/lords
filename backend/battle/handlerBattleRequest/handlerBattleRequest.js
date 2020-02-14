function handlerBattleRequest(message, info) {
  const data = message.data;
  const { ws } = info.player;
  ws.send(JSON.stringify(message));
}

module.exports = handlerBattleRequest;
