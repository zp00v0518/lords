const buildings = require('../../town/Town').listBuildings;
const finishStorage = require('./finish_storage');

module.exports = {
  [buildings.storage.name]: finishStorage,
}