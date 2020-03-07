const addEventToDB = require("./addEventToDB");

function setEventInGame(event, serverName) {
  addEventToDB(event, serverName).then(result => {
  });
}

module.exports = setEventInGame;
