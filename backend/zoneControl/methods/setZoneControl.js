const getRadiusZone = require('./getRadiusZone');
const getSectorOnMatrix = require('../../globalMap/getSectorOnMatrix');
const setPowerControlOnDB = require('../db/setPowerControlOnDB');
const setWeightForCell = require('./setWeightForCell');
const arr = [
  [{ x: 17, y: 18 }, { x: 17, y: 19 }, { x: 17, y: 0 }],
  [{ x: 18, y: 18 }, { x: 18, y: 19 }, { x: 18, y: 0 }],
  [{ x: 19, y: 18 }, { x: 19, y: 19 }, { x: 19, y: 0 }]
];

async function setZoneControl(serverName, power = 0, center, user) {
  const GlobalMap = require('../../globalMap/constractGlobalMap');
  const length = GlobalMap[serverName].length;
  const centerX = center.x;
  const centerY = center.y;
  let radius = getRadiusZone(power);
  radius = radius <= 0 ? 1 : radius;
  const arr = getSectorOnMatrix(length, radius * 2, { x: centerX, y: centerY });
  setWeightForCell(power, arr);
  console.log(arr);
  console.log(user);
  await setPowerControlOnDB(serverName, arr, user);
}

module.exports = setZoneControl;
