const { addValueToStorage } = require('../town/storage');

function addResourceToStorageFromCaravan(payload, storage) {
  Object.keys(payload).forEach(type => {
    const value = payload[type];
    addValueToStorage(value, type, storage);
  });
}

module.exports = addResourceToStorageFromCaravan;
