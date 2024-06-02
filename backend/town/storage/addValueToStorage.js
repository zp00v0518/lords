function addValueToStorage(value, type, storage) {
  const { sources } = storage;
  if (!sources[type] === undefined) return;
  const { maxValue, nowValue } = sources[type];
  sources[type].nowValue = nowValue + value > maxValue ? maxValue : nowValue + value;
}

module.exports = addValueToStorage;
