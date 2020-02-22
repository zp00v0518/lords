const createTown = require("./createTown.js");
const upgradeSection = require("./upgradeSection.js");
const globalControlStateInTown = require("./globalControlStateInTown");
const DB = require("./DB");

module.exports = {
  ...DB,
  createTown,
  upgradeSection,
  globalControlStateInTown
};
