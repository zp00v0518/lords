import getRadiusZone from './getRadiusZone.js';
import getSectorOnMatrix from '../../globalMap/getSectorOnMatrix.js';
import setPowerControlOnDB from '../db/setPowerControlOnDB.js';
import setWeightForCell from './setWeightForCell.js';

async function setZoneControl(serverName, power = 0, center, user) {
  const GlobalMap = await import('../../globalMap/constractGlobalMap.js');
  const length = GlobalMap.default[serverName].length;
  const centerX = center.x;
  const centerY = center.y;
  let radius = getRadiusZone(power);
  radius = radius <= 0 ? 1 : radius;
  const arr = getSectorOnMatrix(length, radius * 2, { x: centerX, y: centerY });
  setWeightForCell(power, arr);
  await setPowerControlOnDB(serverName, arr, user);
}

export default setZoneControl;
