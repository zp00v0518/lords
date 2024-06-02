const sendWSMessage = require('./sendWSMessage');

function reloadMessage(ws) {
  const reload = {
    type: "console",
    // type: "reload",
    status: true
  };
  sendWSMessage(ws, reload);
  // ws.send(JSON.stringify(reload));
}

function redirectMessage(ws, url = "/") {
  const redirect = {
    redirectUrl: url,
    status: false
  };
  sendWSMessage(ws, redirect);
  // ws.send(JSON.stringify(redirect));
}

module.exports = { reloadMessage, redirectMessage };
