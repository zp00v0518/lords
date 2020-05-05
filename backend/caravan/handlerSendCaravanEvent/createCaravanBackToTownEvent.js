const Ev = require('../../events/Event');

function createCaravanBackToTownEvent(prevEvent) {
  const { init, data } = prevEvent;
  const time = prevEvent.end - prevEvent.start;
  const start = Date.now();
  const end = start + time;
  const target = init;
  const type = Ev.types.caravanBackToTown;
  return {
    data,
    target,
    start,
    end,
    init,
    type
  };
}


module.exports = createCaravanBackToTownEvent;
