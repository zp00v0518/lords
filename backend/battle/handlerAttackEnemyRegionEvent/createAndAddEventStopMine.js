import { createStopMineEvent } from '../../events/createEvents/index.js';
import { addEventToDB } from '../../events/db/index.js';

async function createAndAddEventStopMine(baseEvent, mine, targetForEvent) {
  const { serverName } = baseEvent;
  const workSection = mine.sector.work;
  const stopMineEvent = createStopMineEvent(serverName, workSection.date, targetForEvent, {
    x: mine.x,
    y: mine.y,
  });
  const eventInDb = await addEventToDB(stopMineEvent, serverName);
  mine.events = [];
  mine.events.push(eventInDb.insertedId.toString());
}

export default createAndAddEventStopMine;
