const { addEventToDB } = require("../../events");

function setEventForHiringUnit({
  sector,
  info,
  unitName,
  count,
  timeHiring = 0,
  callback = () => {}
}) {
  new Promise((resolve, reject) => {
    const dataForDB = {
      target: {
        sector: sector._id,
        race: sector.town.race,
        user: sector.userId,
        x: sector.x,
        y: sector.y
      },
      init: {
        sector: sector._id,
        race: sector.town.race,
        user: sector.userId,
        x: sector.x,
        y: sector.y
      },
      type: "hiringUnits",
      start: new Date().getTime(),
      end: new Date().getTime() + timeHiring,
      data: {
        unitName,
        count,
        unitRace: sector.town.race
      }
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

module.exports = setEventForHiringUnit;
