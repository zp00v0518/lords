const addEventToDB = require("./addEventToDB");

function setEventInGame(event, serverName) {
  addEventToDB(event, serverName).then(result => {
    console.log("Event battle insert to db");
  });
}

module.exports = setEventInGame;
