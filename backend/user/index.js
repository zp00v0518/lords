import userCreate from './userCreate.js';
import getInfoForUserPage from './getInfoForUserPage.js';
import { findUserInGlobalMap, findUserInDB } from './findUser.js';
import getInfoForStartGame from './getInfoForStartGame.js';
import addNewUserToGlobalMap from './addNewUserToGlobalMap.js';
import addCollectionsToUser from './addCollectionsToUser.js';
import setUserOnline from './setUserOnline.js';
import getUserRandomColor from './getUserRandomColor.js';
import {
  updateUser,
  getOneUserFromDB,
  getUserEvents,
  setUserColor,
  getUsersById,
  getUserBySectorCoords,
  getUsersBySectorsArr
} from './db/index.js';
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
  updateUser,
  getOneUserFromDB,
  getUserEvents,
  setUserColor,
  getUsersById,
  getUserBySectorCoords,
  getUsersBySectorsArr
  // User
};
