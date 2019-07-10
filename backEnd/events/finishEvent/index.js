const buildings = require('../../town/Town').listBuildings;
const finishStorage = require('./finish_storage');
const finishHall = require('./finish_hall');
const finishBarraks = require('./finish_barraks');

module.exports = {
  [buildings.storage.name]: finishStorage,
  [buildings.hall.name]: finishHall,
  [buildings.barraks_1.name]: finishBarraks,
  [buildings.barraks_2.name]: finishBarraks,
  [buildings.barraks_3.name]: finishBarraks,
  [buildings.barraks_4.name]: finishBarraks,
  [buildings.barraks_5.name]: finishBarraks,
  [buildings.barraks_6.name]: finishBarraks,
  [buildings.barraks_7.name]: finishBarraks,
};
