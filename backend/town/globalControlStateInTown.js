const { getAllTownsFromDB } = require('./DB');
const controlStateinTownLoop = require('./controlStateinTownLoop');

function globalControlStateInTown(serverName, callback = () => {}) {
  return new Promise((resolve, reject) => {
    getAllTownsFromDB(serverName)
      .then(result => {
        controlStateinTownLoop(result).then(afterControl => {
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

module.exports = globalControlStateInTown;
