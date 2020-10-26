const template = require('template_func');
const console = new template.Log(__filename);
const time = require('../../../config').time;

function getLootResources(mines, coords) {
  const result = {};
  mines.forEach(mine => {
    const persent = mine.x === coords.x && mine.y === coords.y ? 100 : 25;
    const workBlock = mine.sector.work;
    const growth_in_day = workBlock.addValue * 24 * time.speedGame;
    const lootSize = (growth_in_day / 100) * persent;
    const pauseTime = (time.day / 100 * persent) / time.speedGame;
    result[mine.sector.type] = lootSize;
    workBlock.is = false;
    workBlock.date = Date.now() + pauseTime;
  });
  return result;
}

module.exports = getLootResources;
