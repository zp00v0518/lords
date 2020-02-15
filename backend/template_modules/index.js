const fileReader = require("./fileReader.js");
const mimeType = require("./mimeType.js");
const sendResponse = require("./sendResponse.js");
const reqOn = require("./reqOn.js");
const getCollectionName = require("./getCollectionName.js");
const checkSchema = require("./checkSchema.js");
const getParsePathToImg = require("./getParsePathToImg.js");
const deepClone = require("./deepClone");

module.exports = {
  fileReader,
  mimeType,
  sendResponse,
  reqOn,
  getCollectionName,
  checkSchema,
  getParsePathToImg,
  deepClone
};
