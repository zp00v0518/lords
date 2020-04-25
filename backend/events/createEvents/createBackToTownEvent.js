const ev = require('../Event');
const eventsTypes = ev.types;
const { Heroes } = require('../../heroes');
const WorldMap = require('../../globalMap/WorldMap');

function createBackToTownEvent(prevEvent, options = {}) {
  const { data } = prevEvent;
  const startCoords = data.endCoords;
  const endCoords = data.startCoords;
  let time = Heroes.getTimeMove(startCoords, endCoords);
  if (prevEvent.mode === ev.mode.global) {
    time = WorldMap.getTimeMoveOnMap(startCoords, endCoords);
  }
  const start = new Date().getTime();
  const end = start + time;
  const init = prevEvent.target;
  const target = prevEvent.init;
  const newData = {
    startCoords,
    endCoords,
    initHero: data.initHero,
    typeBattle: data.typeBattle,
    result: options.result
  };
  const template = {
    data: newData,
    target,
    start,
    end,
    init,
    type: eventsTypes.backToTown,
    mode: prevEvent.mode
  };
  return template;
}

module.exports = createBackToTownEvent;
