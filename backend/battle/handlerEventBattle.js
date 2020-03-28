const template = require('template_func');
const log = new template.Log(__filename);
const { updateDB } = require('../workWithMongoDB');
const update = new updateDB();
const { createBackToTownEvent } = require('../events/createEvents');
const { addEventToDB } = require('../events/setEventInGame');
const { getHeroesFromDB } = require('../heroes/db');
const Battle = require('./Battle');
const calculateBattle = require('./calculateBattle');

function handlerEventBattle(event, targetSector) {
  console.log('handlerEventBattle')
  const { data, serverName } = event;
  if (data.typeBattle === Battle.types.region.name) {
    getHeroesFromDB(serverName, { heroId: data.initHero }).then(hero => {
      const { endCoords } = data;
      const defArmy = targetSector.region[endCoords.x][endCoords.y].army;
      const attackArmy = data.army.army;
      const battleList = calculateBattle(hero, attackArmy, defArmy);
      console.log(battleList);
    });
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
        console.log('new event add to db');
      });
    })
    .catch(err => {
      log.log(err);
    });
}

module.exports = handlerEventBattle;
