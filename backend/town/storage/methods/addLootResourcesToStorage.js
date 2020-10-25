const addValueToStorage = require('../addValueToStorage');

function addLootResourcesToStorage(loot, storage) {
  Object.keys(loot).forEach(type => {
    const value = loot[type];
    addValueToStorage(value, type, storage);
  });
}

module.exports = addLootResourcesToStorage;
