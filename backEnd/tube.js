const config = require('./config/config.js');
module.exports.config = config;

const getVariable = require('./developScript/getVariable.js');
module.exports.getVariable = getVariable;

const {fileReader, mimeType, sendResponse, reqOn} = require('./template_modules');
module.exports.fileReader = fileReader;
module.exports.mimeType = mimeType;
module.exports.sendResponse = sendResponse;
module.exports.reqOn = reqOn;

const getMethod = require('./getMethod.js');
module.exports.getMethod = getMethod;

const postMethod = require('./postMethod.js');
module.exports.postMethod = postMethod;


