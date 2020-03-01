require('../variables/global_variables.js');
const allHandler = require('./allHandler.js');
const chat = require('../chat/chat.js');
const { config, findUserInDB, getInfoForStartGame } = require('../tube.js');
const WS = require('ws');
const watcher = require('../liveReload/watchFs.js');
const Cookies = require('cookies');
const { tryJsonParse } = require('template_func');
const { setUserOnline } = require('../user');
const { getCollectionName } = require('../template_modules');

class WsServer {
  init(port) {
    this.server = new WS.Server({ port: port }, () => {
      console.log(`WS-Сервер запущен по адресу http://loclahost:${port}`);
    });
  }
  on(event, callback) {
    this.server.on(event, callback);
  }
}

const wsServer = new WsServer();
wsServer.init(config.server.port.ws);

wsServer.on('connection', (ws, req) => {
  const server = getCollectionName(req.url.split('/')[1]);
  const cookies = new Cookies(req);
  const userCookies = cookies.get('user');
  let User;
  let startMessage = {};
  if (server) {
    startMessage = {
      status: true,
      type: 'startMessages',
      chat: chat[server].map(item => item)
    };
    startMessage.chat.unshift(chat.template);
  } else {
    const message = {
      status: false,
      redirectUrl: '/'
    };
    ws.send(JSON.stringify(message));
    return;
  }

  findUserInDB(userCookies).then(user => {
    if (user) {
      User = user;
      getInfoForStartGame(user, server).then(infoForStartGame => {
        if (infoForStartGame.status === 'no_town') {
          startMessage.type = 'choicesRace';
          startMessage.chat = [];
          ws.send(JSON.stringify(startMessage));
          return;
        }
        setUserOnline(user, server, infoForStartGame, ws);
      });
    } else {
      const message = {
        status: false,
        redirectUrl: '/'
      };
      ws.send(JSON.stringify(message));
    }
  });

  ws.on('close', function() {
    if (User) {
      delete UserOnline[server][User._id];
      UserOnline[server].count--;
    }
  });
  ws.on('message', message => {
    const mess = tryJsonParse(message);
    if (!mess && !mess.type) {
      console.log('Не удалось распарсить строку пришедшую от клиента');
      ws.send(message);
    }
    if (mess.type === 'choicesRace') {
      allHandler[mess.type](mess, { userCookies, ws });
      return;
    }
    if (allHandler[mess.type]) {
      const baseInfo = {
        player: UserOnline[server][User._id],
        server,
        userCookies
      };
      allHandler[mess.type](mess, baseInfo);
    } else {
      ws.send(message);
    }
  });
});

function callbackForWatcher() {
  watcher(config.frontEnd.watchFolder, callbackForWatcher);
  Object.keys(UserOnline).forEach(server => {
    if (UserOnline[server].count > 0) {
      const message = {
        status: true,
        type: 'reload'
      };
      for (let user in UserOnline[server]) {
        if (user !== 'count') {
          UserOnline[server][user].ws.send(JSON.stringify(message));
        }
      }
    }
  });
}
watcher(config.frontEnd.watchFolder, callbackForWatcher);
