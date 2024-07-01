import controlStateinTownLoop from './controlStateinTownLoop.js';
import { getAllTownsFromDB } from './DB/index.js';

function globalControlStateInTown(serverName, callback = () => { }) {
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

export default globalControlStateInTown;
