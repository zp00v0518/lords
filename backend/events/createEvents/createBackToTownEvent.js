import ev from '../Event.js';
const eventsTypes = ev.types;
import { Heroes } from '../../heroes/index.js';
import WorldMap from '../../globalMap/WorldMap.js';

function createBackToTownEvent(prevEvent, result = {}, initUser = true) {
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
  if (!initUser) {
    init.user = '';
  }
  const newData = {
    startCoords,
    endCoords,
    initHero: data.initHero.toString(),
    typeBattle: data.typeBattle,
    result
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

export default createBackToTownEvent;
