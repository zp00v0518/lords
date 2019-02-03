
function upgradeBuilding(message, info) {
  const ws = info.player.ws;
  ws.send(JSON.stringify(message))
}

module.exports = upgradeBuilding;