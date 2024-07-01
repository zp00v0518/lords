import findInDB from '../../workWithMongoDB/findInDB.js';
const find = new findInDB();

async function getUserEvents(serverName, userId, status = true) {
  const findOptions = {
    collectionName: serverName,
    query: {
      $or: [{ 'target.user': userId }, { 'init.user': userId }],
      class: 'event',
      status
    },
    sort: { end: 1 }
  };
  const userEvents = await find.all(findOptions);
  return userEvents.result;
}

export default getUserEvents;
