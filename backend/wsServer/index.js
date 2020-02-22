const defaultMessages = require("./defaultMessages.js");
const sendWSMessage = require("./sendWSMessage");

module.exports = { ...defaultMessages, sendWSMessage };
