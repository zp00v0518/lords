const fileReader = require("./fileReader.js");
const mimeType = require("./mimeType.js");
const sendResponse = require("./sendResponse.js");
const reqOn = require("./reqOn.js");
const getCollectionName = require('./getCollectionName.js')

module.exports = {
  fileReader,
  mimeType,
  sendResponse,
  reqOn,
  getCollectionName,
};
