import { addEventToDB } from "../../events/index.js";
import { updateStateTown } from "../DB/index.js";

function setUpUpgradeChange_building({
  building = {},
  time_for_upgrade = 0,
  sector = {},
  info = {},
  callback = function () { }
}) {
  return new Promise((resolve, reject) => {
    building.upgrade.is = true;
    building.upgrade.date = new Date().getTime() + time_for_upgrade;
    const dataForDB = {
      target: {
        sector: sector._id,
        race: sector.town.race,
        user: info.player.user._id,
        x: sector.x,
        y: sector.y
      },
      init: {
        sector: sector._id,
        user: info.player.user._id,
        race: sector.town.race,
        x: sector.x,
        y: sector.y
      },
      type: "upgradeTown",
      start: new Date().getTime(),
      end: building.upgrade.date,
      data: building
    };
    dataForDB.data.nextLvl = dataForDB.data.lvl + 1;
    addEventToDB(dataForDB, info.server)
      .then(async () => {
        await updateStateTown(sector)
        callback(null);
        return resolve();
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

export default setUpUpgradeChange_building;
