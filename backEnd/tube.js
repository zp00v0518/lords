const config = require("./config/config.js");
module.exports.config = config;
const templateFunc = require("template_func");
module.exports.templateFunc = templateFunc;

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
  reqOn,
  checkSchema,
} = require("./template_modules");
module.exports.fileReader = fileReader;
module.exports.mimeType = mimeType;
module.exports.sendResponse = sendResponse;
module.exports.reqOn = reqOn;
module.exports.checkSchema = checkSchema;

const {
  setCookieUser,
  sessionCreate,
  userSessionUpdate
} = require("./cookies_session");
module.exports.userSessionUpdate = userSessionUpdate;
module.exports.setCookieUser = setCookieUser;
module.exports.sessionCreate = sessionCreate;

const { returnGlobalMap, getGlobalMapSector } = require("./globalMap");
module.exports.GlobalMap = returnGlobalMap;
module.exports.getGlobalMapSector = getGlobalMapSector;

const {
  userCreate,
  getInfoForUserPage,
  findUserInGlobalMap,
  findUserInDB,
  getInfoForStartGame,
  addNewUserToGlobalMap,
  updateUser,
  addCollectionsToUser
} = require("./user");
module.exports.userCreate = userCreate;
module.exports.getInfoForUserPage = getInfoForUserPage;
module.exports.findUserInGlobalMap = findUserInGlobalMap;
module.exports.findUserInDB = findUserInDB;
module.exports.getInfoForStartGame = getInfoForStartGame;
module.exports.addNewUserToGlobalMap = addNewUserToGlobalMap;
module.exports.updateUser = updateUser;
module.exports.addCollectionsToUser = addCollectionsToUser;

const { createTown } = require("./town");
module.exports.createTown = createTown;

const { createStorage, upgradeSection, calcStorageNowValue} = require("./town/storage");
module.exports.createStorage = createStorage;
module.exports.upgradeSection = upgradeSection;
module.exports.calcStorageNowValue = calcStorageNowValue;

const { setUpgradeChange, checkUpgrade } = require("./region");
module.exports.setUpgradeChange = setUpgradeChange;
module.exports.checkUpgrade = checkUpgrade;

const { Mine, createMine } = require("./region/mine");
module.exports.Mine = Mine;
module.exports.createMine = createMine;

const {checkSource, deleteSource} = require('./resources');
module.exports.checkSource = checkSource;
module.exports.deleteSource = deleteSource;

const login = require("./login/login.js");
module.exports.login = login;

const getMethod = require("./getMethod.js");
module.exports.getMethod = getMethod;

const postMethod = require("./postMethod.js");
module.exports.postMethod = postMethod;

const { reloadMessage, redirectMessage } = require('./wsServer');
module.exports.reloadMessage = reloadMessage;
module.exports.redirectMessage = redirectMessage;

const gloss = require("./dictionary/dictionary.js")
module.exports.gloss = gloss;

const { controlStateGlobal } = require('./controlState');
module.exports.controlStateGlobal = controlStateGlobal;
