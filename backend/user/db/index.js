const updateUser = require('./updateUser');
const getOneUserFromDB = require('./getOneUserFromDB');
const getUserEvents = require('./getUserEvents');
const setUserColor = require('./setUserColor');
const getUsersById = require('./getUsersById');
const getUserBySectorCoords = require('./getUserBySectorCoords');
const getUsersBySectorsArr = require('./getUsersBySectorsArr');

module.exports = {
  updateUser,
  getOneUserFromDB,
  getUserEvents,
  setUserColor,
  getUsersById,
  getUserBySectorCoords,
  getUsersBySectorsArr
};
