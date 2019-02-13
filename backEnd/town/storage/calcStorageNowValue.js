const perTime = gameVariables.timer.perTime;

function calcStorageNowValue(storage) {
  // console.log("*********calcStorageNowValue***********")
  const sources = storage.sources;
  const nowTime = new Date().getTime();
  Object.keys(sources).forEach(key => {
    const item = sources[key];
    if (item.lastCalc !== 0) {
      const ost = nowTime - item.lastCalc;
      const d = (item.addValue / perTime) * ost;
      item.nowValue = (item.nowValue + d > item.maxValue) ? item.maxValue : item.nowValue + d;
      item.lastCalc = nowTime;
    }
  });
}

module.exports = calcStorageNowValue;
