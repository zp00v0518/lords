const { checkSchema } = require('../../template_modules');
const { redirectMessage, sendWSMessage } = require('../../wsServer');
const { getOneTownFromDB } = require('../../town');
const Race = require('../../race/Race');
const regionTypes = require('../../region/Region').types;
const { updateStateRegion } = require('../../region');
const { createArmy } = require('../Army');

function updateArmyOnRegion(message, info) {
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
      region.forEach(sectorRow => {
        sectorRow.forEach(tile => {
          if (tile.type === regionTypes.forest.id || tile.type === regionTypes.empty.id) {
            const armyRace = Race.getRandom();
            const units = Object.values(Race[armyRace.name].units);
            const army = createArmy({ range_power_army, units });
            tile.army = army;
            tile.type = regionTypes.forest.id;
          }
        });
      });
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
module.exports = updateArmyOnRegion;
