const template = require("template_func");
const log = new template.Log(__filename);

function sendWSMessage(ws, message) {
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(message));
    return;
  }
  log.log("Soket is closed");
}

module.exports = sendWSMessage;
