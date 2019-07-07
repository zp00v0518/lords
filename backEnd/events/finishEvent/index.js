const buildings = require('../../town/Town').listBuildings;
const finishStorage = require('./finish_storage');
const finishHall = require('./finish_hall');

module.exports = {
  [buildings.storage.name]: finishStorage,
  [buildings.hall.name]: finishHall
};
