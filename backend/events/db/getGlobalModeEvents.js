import findInDB from '../../workWithMongoDB/findInDB.js';
const find = new findInDB();
import ev from '../Event.js';

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

export default getGlobalModeEvents;
