function sendWSMessage(ws, message) {
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(message));
    return;
  }
  console.log('sendWSMessage: ', "Soket is closed");
}

export default sendWSMessage;
