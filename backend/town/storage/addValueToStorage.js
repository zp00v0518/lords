function addValueToStorage(value, type, sources) {
  if (!sources[type] === undefined) return;
  const { maxValue, nowValue } = sources[type];
  sources[type].nowValue = nowValue + value > maxValue ? maxValue : nowValue + value;
}

module.exports = addValueToStorage;
