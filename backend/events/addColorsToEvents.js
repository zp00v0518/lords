const ObjectId = require('mongodb').ObjectID;
const { getUsersById } = require('../user/db');

async function addColorsToEvents(serverName, arr) {
  const arrUserId = arr.map(item => new ObjectId(item.init.user.id));
  const users = await getUsersById(arrUserId);
  // const users = result.result;
  const obj = {};
  users.forEach(user => {
    const id = user._id;
    if (!obj[id]) {
      obj[id] = {};
    }
    obj[id] = user.collections[serverName].color;
  });
  arr.forEach(ev => {
    const id = new ObjectId(ev.init.user.id);
    ev.init.color = obj[id.toString()];
  });
  return arr;
}

module.exports = addColorsToEvents;
