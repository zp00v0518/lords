import userCreate from './userCreate.js';
import getInfoForUserPage from './getInfoForUserPage.js';
import { findUserInGlobalMap, findUserInDB } from './findUser.js';
import getInfoForStartGame from './getInfoForStartGame.js';
import addNewUserToGlobalMap from './addNewUserToGlobalMap.js';
const addCollectionsToUser = require('./addCollectionsToUser.js');
const setUserOnline = require('./setUserOnline');
const getUserRandomColor = require('./getUserRandomColor');
const db = require('./db');
// const User = require("./User");

export {
  userCreate,
  getInfoForUserPage,
  findUserInGlobalMap,
  findUserInDB,
  getInfoForStartGame,
  addNewUserToGlobalMap,
  addCollectionsToUser,
  setUserOnline,
  getUserRandomColor,
  ...db
  // User
};
