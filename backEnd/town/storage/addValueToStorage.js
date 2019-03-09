// const { calcStorageNowValue } = require('../../tube.js');

function addValueToStorage(typeSource, value, storage) {
  const previosValue = storage.sources[typeSource].addValue;
  if (storage.sources[typeSource].lastCalc === 0) {
    storage.sources[typeSource].lastCalc = new Date().getTime();
    storage.sources[typeSource].addValue += value;
    storage.sources[typeSource].addValue -= previosValue;
    // calcStorageNowValue(storage);
  } else {
    // calcStorageNowValue(storage);
    storage.sources[typeSource].addValue += value;
    storage.sources[typeSource].addValue -= previosValue;
    // calcStorageNowValue(storage);
  }
}

module.exports = addValueToStorage;
