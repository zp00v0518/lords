const { finishEventGlobal } = require('../events/finishEvent');
const { updateHeroInDB } = require('../heroes/db');


function handlerBackToTown(event, sector) {
  const { serverName, data } = event;
  const { initHero } = data;
  updateHeroInDB(serverName, initHero, { active: true }).then(() => {
    finishEventGlobal(event).then(() => {
      // console.log('handlerBackToTown');
    });
  });
}

module.exports = handlerBackToTown;
