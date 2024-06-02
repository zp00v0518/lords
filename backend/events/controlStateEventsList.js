const getAllEventsFromDB = require("./getAllEventsFromDB");
const controlStateEventsLoop = require("./controlStateEventsLoop");

function controlStateEventsList(serverName, callback = () => {}) {
  return new Promise((resolve, reject) => {
    getAllEventsFromDB({ serverName })
      .then(result => {
        controlStateEventsLoop(result).then(afterControl => {
          callback(null, afterControl);
          return resolve(afterControl);
        });
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

module.exports = controlStateEventsList;
