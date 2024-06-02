const { getUserEvents } = require('../user/db');
const { getGlobalModeEvents } = require('./db');
const addColorsToEvents = require('../events/addColorsToEvents');

async function formEventsList(userId, serverName, callback = () => {}) {
  const userEvents = await getUserEvents(serverName, userId);
  const globalEvents = await getGlobalModeEvents(serverName, userId);
  await addColorsToEvents(serverName, globalEvents);
  const result = [...userEvents, ...globalEvents];
  result.sort((a, b) => a.end - b.end);
  const now = new Date().getTime;
  if (result.length === 0 || result[0].end > now) {
    return [];
  }
  return result;
}

module.exports = formEventsList;
