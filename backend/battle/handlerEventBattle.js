const template = require('template_func');
const log = new template.Log(__filename);
const { updateDB } = require('../workWithMongoDB');
const update = new updateDB();
const { createBackToTownEvent } = require('../events/createEvents');
const { addEventToDB } = require('../events/setEventInGame');

function handlerEventBattle(event, targetSector) {
  console.log('handlerEventBattleInTown');
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
