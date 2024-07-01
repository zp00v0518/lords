import config from './config/config.js';


// const templateFunc = require('template_func');
// module.exports.templateFunc = templateFunc;

// const getVariable = require('./developScript/getVariable.js');
// module.exports.getVariable = getVariable;

// const { connectMongoDB, findInDB, updateDB, insertDB } = require('./workWithMongoDB');
// module.exports.connectMongoDB = connectMongoDB;
// module.exports.findInDB = findInDB;
// module.exports.updateDB = updateDB;
// module.exports.insertDB = insertDB;

// const { fileReader, mimeType, sendResponse, reqOn, checkSchema } = require('./template_modules');
// module.exports.fileReader = fileReader;
// module.exports.mimeType = mimeType;
// module.exports.sendResponse = sendResponse;
// module.exports.reqOn = reqOn;
// module.exports.checkSchema = checkSchema;

// const { setCookieUser, sessionCreate, userSessionUpdate } = require('./cookies_session');
// module.exports.userSessionUpdate = userSessionUpdate;
// module.exports.setCookieUser = setCookieUser;
// module.exports.sessionCreate = sessionCreate;

// const { returnGlobalMap, getGlobalMapSector } = require('./globalMap');
// module.exports.GlobalMap = returnGlobalMap;
// module.exports.getGlobalMapSector = getGlobalMapSector;

// const {
//   userCreate,
//   getInfoForUserPage,
//   findUserInGlobalMap,
//   findUserInDB,
//   getInfoForStartGame,
//   addNewUserToGlobalMap
// } = require('./user');
// module.exports.userCreate = userCreate;
// module.exports.getInfoForUserPage = getInfoForUserPage;
// module.exports.findUserInGlobalMap = findUserInGlobalMap;
// module.exports.findUserInDB = findUserInDB;
// module.exports.getInfoForStartGame = getInfoForStartGame;
// module.exports.addNewUserToGlobalMap = addNewUserToGlobalMap;

// const { upgradeSection, updateStateTown } = require('./town');
// module.exports.updateStateTown = updateStateTown;
// module.exports.upgradeSection = upgradeSection;

// const { calcStorageNowValue } = require('./town/storage');
// module.exports.calcStorageNowValue = calcStorageNowValue;

// const { setUpgradeChange } = require('./region');
// module.exports.setUpgradeChange = setUpgradeChange;

// const { Mine, createMine } = require('./region/mine');
// module.exports.Mine = Mine;
// module.exports.createMine = createMine;

// const { addEventToDB } = require('./events');
// module.exports.addEventToDB = addEventToDB;

// const { checkSource, deleteSource } = require('./resources');
// module.exports.checkSource = checkSource;
// module.exports.deleteSource = deleteSource;

// const login = require('./login/login.js');
// module.exports.login = login;

import getMethod from './getMethod.js';
// module.exports.getMethod = getMethod;

import postMethod from './postMethod.js';
// module.exports.postMethod = postMethod;

// const { reloadMessage, redirectMessage } = require('./wsServer');
// module.exports.reloadMessage = reloadMessage;
// module.exports.redirectMessage = redirectMessage;

// const gloss = require('./dictionary');
// module.exports.gloss = gloss;

// import { controlStateGlobal, controlZoneControle } from './controlState';
import { controlStateGlobal, controlZoneControle } from './controlState/index.js';
// module.exports.controlStateGlobal = controlStateGlobal;
// module.exports.controlZoneControle = controlZoneControle;

// export { config, };
export { config, controlStateGlobal, controlZoneControle, getMethod, postMethod };
