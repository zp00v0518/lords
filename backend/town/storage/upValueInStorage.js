function upValueInStorage(typeSource, value, storage) {
  if (storage.sources[typeSource].lastCalc === 0) {
    storage.sources[typeSource].lastCalc = new Date().getTime();
    storage.sources[typeSource].addValue += value;
  } else {
    storage.sources[typeSource].addValue += value;
  }
}

module.exports = upValueInStorage;
