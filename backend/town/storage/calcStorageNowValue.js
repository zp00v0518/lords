const gameVariables = require('../../variables/game_variables');

function calcStorageNowValue(storage, timeEnd = new Date().getTime()) {
  const sources = storage.sources;
  const addSource = gameVariables.timer.addSource;
  Object.keys(sources).forEach(key => {
    const item = sources[key];
    if (item.lastCalc !== 0) {
      const ost = timeEnd - item.lastCalc;
      const d = (item.addValue / addSource) * ost;
      item.nowValue =
        item.nowValue + d > item.maxValue ? item.maxValue : item.nowValue + d;
      item.lastCalc = timeEnd;
    }
  });
}

module.exports = calcStorageNowValue;
