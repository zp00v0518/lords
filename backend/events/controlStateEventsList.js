import getAllEventsFromDB from "./getAllEventsFromDB.js";
import controlStateEventsLoop from "./controlStateEventsLoop.js";

function controlStateEventsList(serverName, callback = () => { }) {
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

export default controlStateEventsList;
