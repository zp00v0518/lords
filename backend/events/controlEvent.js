const getAllEventsFromDB = require("./getAllEventsFromDB");
const controlSatateEventsList = require("./controlSatateEventsList");
const newControl = require("./newControl");

function controlEvent(serverName) {
  getAllEventsFromDB({ serverName })
    .then(result => {
      // controlSatateEventsList(result);
      newControl(result).then(afterControl => {
        console.log('end control event');
      });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = controlEvent;
