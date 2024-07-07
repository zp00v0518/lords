const serverList = global.gameVariables ? global.gameVariables.serverList : [];
import { clearAllBusySectors, removeOldContolValuesFromDB } from '../zoneControl/db/index.js';
import { calculateMediumWeight, setZoneControl } from '../zoneControl/methods/index.js';
import { getAllTownsFromDB } from '../town/DB/index.js';
import { getUsersBySectorsArr } from '../user/db/index.js';

async function controlZoneControle() {
  serverList.forEach(async (item) => {
    const serverName = item.collectionName;
    await clearAllBusySectors(serverName);
    const allSectors = await getAllTownsFromDB(serverName);
    const userList = await getUsersBySectorsArr(allSectors);
    // [TODO] напевно, тут треба використати for of, тому що forEach не асінхронний
    allSectors.forEach(async (sector) => {
      const { control, _id } = sector;
      let mediumWeight = calculateMediumWeight(control.values);
      mediumWeight = mediumWeight !== 0 ? mediumWeight : control.lastValue;
      await removeOldContolValuesFromDB(serverName, _id, control.values);
      const user = userList[sector.userId];
      const center = {
        x: sector.x,
        y: sector.y,
      };
      await setZoneControl(serverName, mediumWeight, center, user);
    });
  });
}

export default controlZoneControle;
