const { findInDB } = require('../../workWithMongoDB');
const find = new findInDB();
const ev = require('../Event');

async function getGlobalModeEvents(serverName, userId, status = true) {
  const findOptions = {
    collectionName: serverName,
    query: {
      $and: [
        { class: 'event', status: true, mode: ev.mode.global },
        { 'target.user': { $ne: userId } },
        { 'init.user': { $ne: userId } }
      ],
      class: 'event',
      status
    },
    sort: { end: 1 },
    needFields: {
      data: 0
    }
  };
  const events = await find.all(findOptions);
  return events.result;
}

module.exports = getGlobalModeEvents;
