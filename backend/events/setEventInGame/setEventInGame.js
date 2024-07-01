import { addEventToDB } from '../db/index.js';

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

export default setEventInGame;
