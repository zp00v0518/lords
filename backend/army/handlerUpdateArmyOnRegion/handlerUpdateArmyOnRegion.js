import { checkSchema } from '../../template_modules/index.js';
import { redirectMessage, sendWSMessage } from '../../wsServer/index.js';
import { getOneTownFromDB } from '../../town/index.js';
// const Race = require('../../race/Race');
// const regionTypes = require('../../region/Region').types;
import { updateStateRegion } from '../../region/index.js';
// const { createArmy } = require('../baseArmy');
import changeArmyOnRegion from '../changeArmyOnRegion.js';

function handlerUpdateArmyOnRegion(message, info) {
  const data = message.data;
  const { ws } = info.player;
  const response = {
    status: false,
    type: message.type
  };
  if (!checkSchema(data, schema)) {
    redirectMessage(ws);
    return;
  }
  const curSector = info.player.sectors[data.sectorIndex];
  if (!curSector) {
    redirectMessage(ws);
    return;
  }
  getOneTownFromDB(curSector.serverName, curSector._id)
    .then(sector => {
      const { region } = sector;
      const { armySize } = data;
      const persent = armySize * 0.3;
      const range_power_army = [armySize - persent, armySize + persent];
      changeArmyOnRegion(region, range_power_army);
      updateStateRegion(sector).then(() => {
        response.status = true;
        sendWSMessage(ws, response);
      });
    })
    .catch(err => {
      console.log(err);
      redirectMessage(ws);
    });
}

const schema = {
  sectorIndex: { type: 'number', min: 0 },
  armySize: { type: 'number', min: 500, max: 999999 }
};

export default handlerUpdateArmyOnRegion;
