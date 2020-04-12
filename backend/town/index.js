const createTown = require('./createTown.js');
const upgradeSection = require('./upgradeSection.js');
const globalControlStateInTown = require('./globalControlStateInTown');
const DB = require('./DB');
const Town = require('./Town');

module.exports = {
  ...DB,
  createTown,
  upgradeSection,
  globalControlStateInTown,
  Town
};
