const formEventsList = require('./formEventsList');
const Event = require('./Event');
const setEventInGame = require('./setEventInGame');
const controlStateEventsList = require('./controlStateEventsList');
const createEvents = require('./createEvents');
const getTemplateEvent = require('./getTemplateEvent');
const addColorsToEvents = require('./addColorsToEvents');
const db = require('./db');

module.exports = {
  ...setEventInGame,
  ...createEvents,
  ...db,
  formEventsList,
  controlStateEventsList,
  Event,
  getTemplateEvent,
  addColorsToEvents
};
