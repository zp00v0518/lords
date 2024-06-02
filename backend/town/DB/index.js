const getAllTownsFromDB = require('./getAllTownsFromDB');
const updateStateTown = require('./updateStateTown');
const getUsersTownFromDB = require('./getUsersTownFromDB');
const getOneTownFromDB = require('./getOneTownFromDB');
const getTownByHero = require('./getTownByHero');
const getTownByCoords = require('./getTownByCoords');

module.exports = {
  getAllTownsFromDB,
  updateStateTown,
  getUsersTownFromDB,
  getOneTownFromDB,
  getTownByHero,
  getTownByCoords
};
