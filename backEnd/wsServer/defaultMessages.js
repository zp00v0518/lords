function reloadMessage(ws) {
  const reload = {
    type: "console",
    // type: "reload",
    status: true
  };
  ws.send(JSON.stringify(reload));
}

function redirectMessage(ws, url = "/") {
  const redirect = {
    redirectUrl: url,
    status: false
  };
  ws.send(JSON.stringify(redirect));
}

module.exports = { reloadMessage, redirectMessage };
