const { getTemplateEvent, Event } = require('../../events');
const { WorldMap } = require('../../globalMap');

function createBuildNewTownEvent(sector, targetSector, hero) {
  const template = getTemplateEvent();
  const startCoords = {
    x: sector.x,
    y: sector.y
  };
  const init = {
    sector: sector._id,
    user: sector.userId,
    ...startCoords
  };
  template.init = init;
  // возможно понадобиться необходимость добавить userId и race
  const endCoords = {
    x: targetSector.x,
    y: targetSector.y
  };
  const target = {
    sector: targetSector._id,
    ...endCoords
  };
  template.target = target;
  template.type = Event.types.buildNewTown;
  const moveTime = WorldMap.getTimeMoveOnMap(init, target);
  template.end = template.start + moveTime;
  const data = {
    initHero: hero._id,
    startCoords,
    endCoords
  };
  template.data = data;
  return template;
}

module.exports = createBuildNewTownEvent;
