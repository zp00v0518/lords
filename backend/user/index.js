const userCreate = require('./userCreate.js');
const getInfoForUserPage = require('./getInfoForUserPage.js');
const { findUserInGlobalMap, findUserInDB } = require('./findUser.js');
const getInfoForStartGame = require('./getInfoForStartGame.js');
const addNewUserToGlobalMap = require('./addNewUserToGlobalMap.js');
const addCollectionsToUser = require('./addCollectionsToUser.js');
const setUserOnline = require('./setUserOnline');
const db = require('./db');
// const User = require("./User");

module.exports = {
  userCreate,
  getInfoForUserPage,
  findUserInGlobalMap,
  findUserInDB,
  getInfoForStartGame,
  addNewUserToGlobalMap,
  addCollectionsToUser,
  setUserOnline,
  ...db
  // User
};
