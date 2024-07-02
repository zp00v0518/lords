import config from './config/config.js'

// const templateFunc = require('template_func');
// module.exports.templateFunc = templateFunc;

// const getVariable = require('./developScript/getVariable.js');
// module.exports.getVariable = getVariable;

import { connectMongoDB } from './workWithMongoDB/index.js';
import findInDB from './workWithMongoDB/findInDB.js';
import updateDB from './workWithMongoDB/updateDB.js';
import insertDB from './workWithMongoDB/insertDB.js';
// module.exports.connectMongoDB = connectMongoDB;
// module.exports.findInDB = findInDB;
// module.exports.updateDB = updateDB;
// module.exports.insertDB = insertDB;

import { fileReader, mimeType, sendResponse, reqOn, checkSchema } from './template_modules/index.js'
// module.exports.fileReader = fileReader;
// module.exports.mimeType = mimeType;
// module.exports.sendResponse = sendResponse;
// module.exports.reqOn = reqOn;
// module.exports.checkSchema = checkSchema;

import { setCookieUser, sessionCreate, userSessionUpdate } from './cookies_session/index.js';
// module.exports.userSessionUpdate = userSessionUpdate;
// module.exports.setCookieUser = setCookieUser;
// module.exports.sessionCreate = sessionCreate;

import { returnGlobalMap, getGlobalMapSector } from './globalMap/index.js'
// module.exports.GlobalMap = returnGlobalMap;
// module.exports.getGlobalMapSector = getGlobalMapSector;

import {
    userCreate,
    getInfoForUserPage,
    findUserInGlobalMap,
    findUserInDB,
    getInfoForStartGame,
    addNewUserToGlobalMap
} from './user/index.js';
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

import { setUpgradeChange } from './region/index.js';
// module.exports.setUpgradeChange = setUpgradeChange;

// const { Mine, createMine } = require('./region/mine');
// module.exports.Mine = Mine;
// module.exports.createMine = createMine;

// const { addEventToDB } = require('./events');
// module.exports.addEventToDB = addEventToDB;

import { checkSource, deleteSource } from './resources/index.js';
// module.exports.checkSource = checkSource;
// module.exports.deleteSource = deleteSource;

import login from './login/login.js';
// module.exports.login = login;

import getMethod from './getMethod.js'
// module.exports.getMethod = getMethod;

import postMethod from './postMethod.js'
// module.exports.postMethod = postMethod;

import { reloadMessage, redirectMessage } from './wsServer/index.js'
// module.exports.reloadMessage = reloadMessage;
// module.exports.redirectMessage = redirectMessage;

import gloss from './dictionary/index.js';
// module.exports.gloss = gloss;

// import { controlStateGlobal, controlZoneControle } from './controlState';
import { controlStateGlobal, controlZoneControle } from './controlState/index.js'
// module.exports.controlStateGlobal = controlStateGlobal;
// module.exports.controlZoneControle = controlZoneControle;

// export { config, };
export {
    config,
    controlStateGlobal,
    controlZoneControle,
    getMethod,
    postMethod,
    reloadMessage,
    redirectMessage,
    fileReader,
    mimeType,
    sendResponse,
    reqOn,
    checkSchema,
    returnGlobalMap,
    getGlobalMapSector,
    checkSource, deleteSource, gloss, setUpgradeChange,
    userCreate,
    getInfoForUserPage,
    findUserInGlobalMap,
    findUserInDB,
    getInfoForStartGame,
    addNewUserToGlobalMap,
    login,
    setCookieUser, sessionCreate, userSessionUpdate,
    connectMongoDB, findInDB, updateDB, insertDB
}
