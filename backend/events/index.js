const formEventsList = require("./formEventsList");
const controlSatateEventsList = require("./controlSatateEventsList");
const Event = require("./Event");
const setEventInGame = require("./setEventInGame");

module.exports = {
  ...setEventInGame,
  formEventsList,
  controlSatateEventsList,
  Event
};
