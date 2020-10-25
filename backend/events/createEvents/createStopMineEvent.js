const template = require('template_func');
const console = new template.Log(__filename);
const ev = require('../Event');
const eventsTypes = ev.types;

function createStopMineEvent(serverName, userId, timeEnd, coords) {
  const template = {
    target: {
      user: userId
    },
    serverName,
    mode: ev.mode.system,
    type: eventsTypes.stopMine,
    start: Date.now(),
    end: timeEnd,
    data: {
      mineCoords: coords
    }
  };
  return template;
}

module.exports = createStopMineEvent;
