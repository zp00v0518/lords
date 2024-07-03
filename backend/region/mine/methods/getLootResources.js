import gameVariables from '../../../variables/game_variables.js';

function getLootResources(mines, coords) {
  const result = {};
  mines.forEach(mine => {
    const persent = mine.x === coords.x && mine.y === coords.y ? 100 : 25;
    const workBlock = mine.sector.work;
    const addSource = gameVariables.timer.addSource;
    const addValue = workBlock.addValue;
    const baseLootSize = (addValue / 100) * persent;
    const pauseTime = (addSource / 100) * persent;
    const basePauseEnd = Date.now() + pauseTime;
    if (basePauseEnd <= workBlock.date) {
      result[mine.sector.type] = 0;
      return;
    }
    const computedPersent = !workBlock.date ? persent : ((pauseTime - (workBlock.date - Date.now())) / pauseTime) * 100;
    result[mine.sector.type] = (baseLootSize / 100) * computedPersent;
    workBlock.date = basePauseEnd;
  });
  return result;
}

export default getLootResources
