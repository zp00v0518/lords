const userCreate = require("./userCreate.js");
const getInfoForUserPage = require("./getInfoForUserPage.js");
const { findUserInGlobalMap, findUserInDB } = require("./findUser.js");
// const findUserInGlobalMap = require("./findUserInGlobalMap.js");
const getInfoForStartGame= require("./getInfoForStartGame.js");
const addNewUserToGlobalMap= require("./addNewUserToGlobalMap.js");

module.exports = {
  userCreate,
  getInfoForUserPage,
  findUserInGlobalMap,
  findUserInDB,
  getInfoForStartGame,
  addNewUserToGlobalMap,
};
