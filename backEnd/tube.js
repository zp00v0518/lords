const config = require("./config/config.js");
module.exports.config = config;

const getVariable = require("./developScript/getVariable.js");
module.exports.getVariable = getVariable;

const {
  connectMongoDB,
  findInDB,
  updateDB,
  insertDB
} = require("./workWithMongoDB");
module.exports.connectMongoDB = connectMongoDB;
module.exports.findInDB = findInDB;
module.exports.updateDB = updateDB;
module.exports.insertDB = insertDB;

const {
  fileReader,
  mimeType,
  sendResponse,
  reqOn
} = require("./template_modules");
module.exports.fileReader = fileReader;
module.exports.mimeType = mimeType;
module.exports.sendResponse = sendResponse;
module.exports.reqOn = reqOn;

const {
  setCookieUser,
  sessionCreate,
  userSessionUpdate
} = require("./cookies_session");
module.exports.userSessionUpdate = userSessionUpdate;
module.exports.setCookieUser = setCookieUser;
module.exports.sessionCreate = sessionCreate;

const {
  userCreate,
  getInfoForUserPage,
  findUserInGlobalMap,
  findUserInDB
} = require("./user");
module.exports.userCreate = userCreate;
module.exports.getInfoForUserPage = getInfoForUserPage;
module.exports.findUserInGlobalMap = findUserInGlobalMap;
module.exports.findUserInDB = findUserInDB;

const login = require("./login/login.js");
module.exports.login = login;

const getMethod = require("./getMethod.js");
module.exports.getMethod = getMethod;

const postMethod = require("./postMethod.js");
module.exports.postMethod = postMethod;

const returnGlobalMap = require("./globalMap/constractGlobalMap.js");
module.exports.returnGlobalMap = returnGlobalMap;
