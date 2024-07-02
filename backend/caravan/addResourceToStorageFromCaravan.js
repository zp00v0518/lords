import { addValueToStorage } from '../town/storage/index.js';

function addResourceToStorageFromCaravan(payload, storage) {
  Object.keys(payload).forEach(type => {
    const value = payload[type];
    addValueToStorage(value, type, storage);
  });
}

export default addResourceToStorageFromCaravan;
