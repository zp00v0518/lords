const config = require('./config/config.js');
module.exports.config = config;

const {	fileReader, mimeType, sendResponse} = require('./template_modules');
module.exports.fileReader = fileReader;
module.exports.mimeType = mimeType;
module.exports.sendResponse = sendResponse;

const getMethod = require('./getMethod.js');
module.exports.getMethod = getMethod;
