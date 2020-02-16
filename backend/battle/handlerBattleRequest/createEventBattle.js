const { Heroes } = require("../../heroes");
const { Event } = require("../../events");

function createEventBattle({ info, startCoords, endCoords, army, goal }) {
  const serverName = info.server;
  const init = info.player.user._id;
  const target = goal === undefined ? init : "";
  const time = Heroes.getTimeMove(startCoords, endCoords);
  const start = new Date().getTime();
  const end = start + time;
  const data = {
    startCoords,
    endCoords,
    army
  };
  return {
    data: JSON.parse(JSON.stringify(data)),
    target,
    serverName,
    start,
    end,
    type: Event.types.battle
  };
}

module.exports = createEventBattle;
