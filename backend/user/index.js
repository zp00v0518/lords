const userCreate = require('./userCreate.js');
const getInfoForUserPage = require('./getInfoForUserPage.js');
const { findUserInGlobalMap, findUserInDB } = require('./findUser.js');
const getInfoForStartGame = require('./getInfoForStartGame.js');
const addNewUserToGlobalMap = require('./addNewUserToGlobalMap.js');
const updateUser = require('./updateUser.js');
const addCollectionsToUser = require('./addCollectionsToUser.js');
const setUserOnline = require('./setUserOnline');
// const User = require("./User");

module.exports = {
  userCreate,
  getInfoForUserPage,
  findUserInGlobalMap,
  findUserInDB,
  getInfoForStartGame,
  addNewUserToGlobalMap,
  updateUser,
  addCollectionsToUser,
  setUserOnline
  // User
};
