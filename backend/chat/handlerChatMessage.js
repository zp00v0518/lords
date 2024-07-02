import globalChat from './chat.js';
import { checkSchema, redirectMessage } from '../tube.js';

function handlerChatMessage(message, info) {
  const ws = info.player.ws;
  if (!checkSchema(message, schema)) {
    redirectMessage(ws);
    return;
  }
  const { server, player } = info;
  const chat = globalChat[server];
  message.author = player.user.nickName;
  message.status = true;
  message.time = new Date();
  if (chat.length > 30) chat.pop();
  chat.unshift(message);
  for (let key in UserOnline[server]) {
    if (key !== 'count') {
      UserOnline[server][key].ws.send(JSON.stringify(message));
    }
  }
}

const schema = {
  text: { type: 'string' },
  chanel: { type: 'string' },
  type: { type: 'string' },
  privat: { type: 'string' }
};

export default handlerChatMessage;
