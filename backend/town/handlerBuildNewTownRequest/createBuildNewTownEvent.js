const { getTemplateEvent, Event } = require('../../events');
const { WorldMap } = require('../../globalMap');

function createBuildNewTownEvent(sector, targetSector, hero) {
  const template = getTemplateEvent();
  const init = {
    sector: sector._id,
    user: sector.userId,
    x: sector.x,
    y: sector.y
  };
  template.init = init;
  // возможно понадобиться необходимость добавить userId и race
  const target = {
    sector: targetSector._id,
    x: targetSector.x,
    y: targetSector.y
  };
  template.target = target;
  template.type = Event.types.buildNewTown;
  const moveTime = WorldMap.getTimeMoveOnMap(init, target);
  template.end = template.start + moveTime;
  template.data = {};
  return template;
}

module.exports = createBuildNewTownEvent;
