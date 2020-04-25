const { getUserEvents } = require('../user/db');
const { getGlobalModeEvents } = require('./db');

async function formEventsList(userId, serverName, callback = () => {}) {
  const userEvents = await getUserEvents(serverName, userId);
  const globalEvents = await getGlobalModeEvents(serverName, userId);
  const result = [...userEvents, ...globalEvents];
  result.sort((a, b) => a.end - b.end);
  const now = new Date().getTime;
  if (result.length === 0 || result[0].end > now) {
    return [];
  }
  return result;
}

module.exports = formEventsList;
