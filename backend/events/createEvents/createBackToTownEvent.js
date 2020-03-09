const eventsTypes = require('../Event').types;
const { Heroes } = require('../../heroes');

function createBackToTownEvent(prevEvent, result = {}) {
  const { data } = prevEvent;
  const startCoords = data.endCoords;
  const endCoords = data.startCoords;
  const time = Heroes.getTimeMove(startCoords, endCoords);
  const start = new Date().getTime();
  const end = start + time;
  const init = prevEvent.init;
  const target = prevEvent.init;
  const newData = {
    startCoords,
    endCoords,
    initHero: data.initHero,
    typeBattle: data.typeBattle,
    result
  };
  const template = {
    data: newData,
    target,
    start,
    end,
    init,
    type: eventsTypes.backToTown
  };
  return template;
}

module.exports = createBackToTownEvent;
