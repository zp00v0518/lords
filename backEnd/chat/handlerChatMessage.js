const chat = require('./chat.js');

function handlerChatMessage(message, info) {
  const { server, player } = info;
  message.author = player.user.nickName;
  message.status = true;
  message.time = new Date();
  if (chat.length > 30) chat.pop();
  chat.unshift(message);
  for (let key in UserOnline[server]) {
    if (key !== "count") {
      UserOnline[server][key].ws.send(JSON.stringify(message));
    }
  }
}
module.exports = handlerChatMessage;