const { getTemplateEvent, Event } = require('../../events');
const { WorldMap } = require('../../globalMap');

function createHeroTransferEvent(initSector, targetSector, hero) {
  const template = getTemplateEvent();
  const mode = hero.army.length > 0 ? Event.mode.global : Event.mode.hidden;
  template.mode = mode;
  const startCoords = {
    x: initSector.x,
    y: initSector.y
  };
  const init = {
    sector: initSector._id,
    user: initSector.userId,
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
  template.type = Event.types.heroTransfer;
  const moveTime = WorldMap.getTimeMoveOnMap(init, target, hero);
  template.end = template.start + moveTime;
  const data = {
    initHero: hero._id,
    startCoords,
    endCoords
  };
  template.data = data;
  return template;
}

module.exports = createHeroTransferEvent;
