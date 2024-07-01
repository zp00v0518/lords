import createTown from './createTown.js';
import upgradeSection from './upgradeSection.js';
import globalControlStateInTown from './globalControlStateInTown.js';
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
