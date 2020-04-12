const formEventsList = require('./formEventsList');
const Event = require('./Event');
const setEventInGame = require('./setEventInGame');
const controlStateEventsList = require('./controlStateEventsList');
const createEvents = require('./createEvents');
const getTemplateEvent = require('./getTemplateEvent');

module.exports = {
  ...setEventInGame,
  ...createEvents,
  formEventsList,
  controlStateEventsList,
  Event,
  getTemplateEvent
};
