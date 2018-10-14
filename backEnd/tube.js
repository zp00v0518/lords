const config = require('./config/config.js');
module.exports.config = config;

const getVariable = require('./developScript/getVariable.js');
module.exports.getVariable = getVariable;

const {connectMongoDB, findInDB, updateDB, insertDB} = require('./workWithMongoDB');
module.exports.connectMongoDB = connectMongoDB;
module.exports.findInDB = findInDB;
module.exports.updateDB = updateDB;
module.exports.insertDB = insertDB;

const {fileReader, mimeType, sendResponse, reqOn} = require('./template_modules');
module.exports.fileReader = fileReader;
module.exports.mimeType = mimeType;
module.exports.sendResponse = sendResponse;
module.exports.reqOn = reqOn;

const login = require('./login/login.js');
module.exports.login = login;

const getMethod = require('./getMethod.js');
module.exports.getMethod = getMethod;

const postMethod = require('./postMethod.js');
module.exports.postMethod = postMethod;


