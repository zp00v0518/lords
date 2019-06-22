function calcStorageNowValue(storage, timeEnd = new Date().getTime()) {
  // console.log("*********calcStorageNowValue***********")
  // console.log(storage)
  const sources = storage.sources;
  const perTime = gameVariables.timer.perTime;
  Object.keys(sources).forEach(key => {
    const item = sources[key];
    if (item.lastCalc !== 0) {
      const ost = timeEnd - item.lastCalc;
      const d = (item.addValue / perTime) * ost;
      item.nowValue =
        item.nowValue + d > item.maxValue ? item.maxValue : item.nowValue + d;
      item.lastCalc = timeEnd;
    }
  });
}

module.exports = calcStorageNowValue;
