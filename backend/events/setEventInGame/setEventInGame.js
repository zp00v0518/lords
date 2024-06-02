const { addEventToDB } = require('../db');

function setEventInGame(event, serverName) {
  return new Promise((resolve, reject) => {
    addEventToDB(event, serverName)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = setEventInGame;
