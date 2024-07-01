import addValueToStorage from '../addValueToStorage.js';

function addLootResourcesToStorage(loot, storage) {
  Object.keys(loot).forEach(type => {
    const value = loot[type];
    addValueToStorage(value, type, storage);
  });
}

export default addLootResourcesToStorage;
