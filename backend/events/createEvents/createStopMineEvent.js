const template = require('template_func');
const console = new template.Log(__filename);
const ev = require('../Event');
const eventsTypes = ev.types;

function createStopMineEvent(serverName, timeEnd, target = {}, coords) {
  // target: type: Object, fields: user(UserId), sector(sectorId)
  const template = {
    target,
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
