function handlerBuyUnits(message, info) {
  console.log(arguments.callee.name);
  const data = message.data;
  const ws = info.player.ws;
  ws.send(JSON.stringify(message));
}

module.exports = handlerBuyUnits;
