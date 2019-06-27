const { addEventToDB } = require('../../events');
function setUpUpgradeChange_building({
  building = {},
  time_for_upgrade = 0,
  sector = {},
  info = {},
  callback = function() {}
}) {
  return new Promise((resolve, reject) => {
    building.upgrade.is = true;
    building.upgrade.date = new Date().getTime() + time_for_upgrade;
    const dataForDB = {
      target: {
        sector: sector._id,
        user: info.player.user._id,
        x: sector.x,
        y: sector.y
      },
      init: {
        sector: sector._id,
        user: info.player.user._id,
        x: sector.x,
        y: sector.y
      },
      type: 'upgradeTown',
      start: new Date().getTime(),
      end: building.upgrade.date,
      data: building
    };
    addEventToDB(dataForDB, info.server)
      .then(result => {
        const addEvent = result.ops[0];
        info.player.eventsList.push(addEvent);
        info.player.eventsList.sort((a, b) => {
          return a.end - b.end;
        });
        callback(null);
        return resolve();
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

module.exports = setUpUpgradeChange_building;
