const template = require('template_func');
const log = new template.Log(__filename);
const { updateDB } = require('../workWithMongoDB');
const update = new updateDB();
const { createBackToTownEvent } = require('../events/createEvents');
const { addEventToDB } = require('../events/setEventInGame');
const { getHeroesFromDB, updateHeroInDB } = require('../heroes/db');
const Battle = require('./Battle');
const calculateBattle = require('./calculateBattle');
const setUnitsAfterBattle = require('./setUnitsAfterBattle');
const { Region, updateStateRegion } = require('../region');

function handlerEventBattle(event, targetSector) {
  const { data, serverName } = event;
  if (data.typeBattle === Battle.types.region.name) {
    getHeroesFromDB(serverName, { heroId: data.initHero }).then(hero => {
      const { endCoords } = data;
      const tile = targetSector.region[endCoords.x][endCoords.y];
      const defArmy = tile.army;
      let atackArmy = data.army.army;
      const battleResult = calculateBattle(hero, atackArmy, defArmy);
      console.log(battleResult);
      // передаю не армию героя, а армию из Eventa
      setUnitsAfterBattle(battleResult, atackArmy);
      atackArmy = atackArmy.filter(i => i.count > 0);
      updateHeroInDB(serverName, hero._id, { army: atackArmy, active: true }).then(() => {
        if (battleResult.atackWin) {
          tile.army = [];
          tile.type = Region.types.empty.id
          updateStateRegion(targetSector);
        }
        const optionsForUpdate = {
          collectionName: event.serverName,
          filtr: { _id: event._id },
          updateDoc: { $set: { status: false } }
        };
        update
          .one(optionsForUpdate)
          .then(result => {
            const backEvent = createBackToTownEvent(event);
            addEventToDB(backEvent, event.serverName).then(() => {
              // console.log('new event add to db');
            });
          })
          .catch(err => {
            log.log(err);
          });
      });
    });
  }
}

module.exports = handlerEventBattle;
