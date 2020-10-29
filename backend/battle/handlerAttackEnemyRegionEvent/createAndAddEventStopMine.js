const template = require('template_func');
const console = new template.Log(__filename);
const { createStopMineEvent } = require('../../events/createEvents');
const { addEventToDB } = require('../../events/db');

async function createAndAddEventStopMine(baseEvent, mine, targetForEvent) {
  const { serverName } = baseEvent;
  const workSection = mine.sector.work;
  const stopMineEvent = createStopMineEvent(serverName, workSection.date, targetForEvent, {
    x: mine.x,
    y: mine.y
  });
  const eventInDb = await addEventToDB(stopMineEvent, serverName);
  mine.events = [];
  mine.events.push(eventInDb.ops[0]._id.toString());
}

module.exports = createAndAddEventStopMine;
