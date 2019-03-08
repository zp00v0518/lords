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
      const now = new Date().getTime;
      if (result.result.length === 0 || result.result[0].end  > (now+100)) {
        callback(null, result.result);
        return resolve(result.result)
      } else {
        console.log(result.result)
        callback(null, result.result);
        return resolve(result.result)
      }
      
    }).catch(err => {
      callback(err);
      return reject(err);
    });
  });
}

module.exports = formEventsList;
