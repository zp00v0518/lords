const { finishEventGlobal } = require('../events/finishEvent');

function handlerBackToTown(event, sector) {
  finishEventGlobal(event).then(() => {
    // console.log('handlerBackToTown');
  });
}

module.exports = handlerBackToTown;
