const createTown = require('./createTown.js');
const upgradeSection = require('./upgradeSection.js');
const globalControlStateInTown = require('./globalControlStateInTown');
const DB = require('./DB');
const Town = require('./Town');
const events = require('./events');

module.exports = {
  ...DB,
  ...events,
  createTown,
  upgradeSection,
  globalControlStateInTown,
  Town
};
