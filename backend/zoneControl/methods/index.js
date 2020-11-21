const createZoneControlToDB = require('./createZoneControlToDB');
const getFirstWeightControl = require('./getFirstWeightControl');
const getControlWeightFromBuilding = require('./getControlWeightFromBuilding');
const getControlWeightFromArmy = require('./getControlWeightFromArmy');
const getRadiusZone = require('./getRadiusZone');
const setZoneControl = require('./setZoneControl');

module.exports = {
  createZoneControlToDB,
  getControlWeightFromBuilding,
  getControlWeightFromArmy,
  getFirstWeightControl,
  setZoneControl,
  getRadiusZone
};
