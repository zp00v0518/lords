import config from './config/config.js'

// const templateFunc = require('template_func');

import getVariable from './developScript/getVariable.js';

import { connectMongoDB } from './workWithMongoDB/index.js';
import findInDB from './workWithMongoDB/findInDB.js';
import updateDB from './workWithMongoDB/updateDB.js';
import insertDB from './workWithMongoDB/insertDB.js';


import { fileReader, mimeType, sendResponse, reqOn, checkSchema } from './template_modules/index.js'


import { setCookieUser, sessionCreate, userSessionUpdate } from './cookies_session/index.js';


import { returnGlobalMap, getGlobalMapSector } from './globalMap/index.js'
    ;

import {
    userCreate,
    getInfoForUserPage,
    findUserInGlobalMap,
    findUserInDB,
    getInfoForStartGame,
    addNewUserToGlobalMap
} from './user/index.js';


// const { upgradeSection, updateStateTown } = require('./town');


// const { calcStorageNowValue } = require('./town/storage');

import { setUpgradeChange } from './region/index.js';

// const { Mine, createMine } = require('./region/mine');


// const { addEventToDB } = require('./events');

import { checkSource, deleteSource } from './resources/index.js';


import login from './login/login.js';

import getMethod from './getMethod.js'

import postMethod from './postMethod.js'

import { reloadMessage, redirectMessage } from './wsServer/index.js'


import gloss from './dictionary/index.js';

import { controlStateGlobal, controlZoneControle } from './controlState/index.js'


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
    connectMongoDB, findInDB, updateDB, insertDB,
    getVariable
}
