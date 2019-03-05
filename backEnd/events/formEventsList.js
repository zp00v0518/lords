const { findInDB, config } = require('../tube.js');
const find = new findInDB();

function formEventsList(player, serverName, callback = () => {}) {
  return new Promise((resolve, reject) => {
    const findOptions = {
      collectionName: serverName,
      query: {
        $or: [
          { 'target.user': player.user._id },
          { 'init.user': player.user._id }
        ],
        class: 'event',
        status: true
      },
      sort: {end: 1}
    };
    find.all(findOptions).then(result => {
      callback(null, result.result);
      return resolve(result.result)
    }).catch(err => {
      callback(err);
      return reject(err);
    });
  });
}

module.exports = formEventsList;
