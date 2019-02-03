function sendReloadMessage(ws){
  const reload = {
    type: 'reload',
    status: true,
  }
  ws.send(JSON.stringify(reload))
}

module.exports = sendReloadMessage;
