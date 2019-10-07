require('../variables/global_variables.js');
const allHandler = require('./allHandler.js');
const chat = require('../chat/chat.js');
// const getLangDictionary = require('../dictionary/getLangDictionary');
const {
  config,
  findUserInDB,
  getInfoForStartGame,
  // getGlobalMapSector,
  // calcStorageNowValue
} = require('../tube.js');
const WS = require('ws');
const watcher = require('../liveReload/watchFs.js');
// const { Race } = require('../race');
const Cookies = require('cookies');
const { tryJsonParse } = require('template_func');
const { setUserOnline } = require('../user');
const getCollectionName = srcRequire('/template_modules/getCollectionName');

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
      getInfoForStartGame(user, server).then(infoForStartGame => {
        if (infoForStartGame.status === 'no_town') {
          startMessage.type = 'choicesRace';
          startMessage.chat = [];
          ws.send(JSON.stringify(startMessage));
          return;
        }
        User = user;
        setUserOnline(user, server, infoForStartGame, ws);
        return;
        // UserOnline[server][User._id] = {};
        // UserOnline[server][User._id].ws = ws;
        // UserOnline[server].count++;
        // UserOnline[server][User._id].user = User;
        // infoForStartGame.sectors.forEach(item => {
        //   GlobalMap[server][item.x][item.y] = item;
        //   calcStorageNowValue(item.town.storage);
        // });
        // UserOnline[server][User._id].sectors = infoForStartGame.sectors;
        // UserOnline[server][User._id].eventsList = infoForStartGame.eventsList;
        // UserOnline[server][User._id].user.globalMap = {};
        // UserOnline[server][User._id].user.globalMap.zoom = 1;
        // UserOnline[server][User._id].user.globalMap.centerMap = {};
        // UserOnline[server][User._id].user.globalMap.centerMap.x =
        //   infoForStartGame.sectors[0].x;
        // UserOnline[server][User._id].user.globalMap.centerMap.y =
        //   infoForStartGame.sectors[0].y;
        // getGlobalMapSector(
        //   UserOnline[server][User._id].user,
        //   server,
        //   currentMap => {
        //     startMessage.eventsList = infoForStartGame.eventsList;
        //     startMessage.currentMap = currentMap;
        //     startMessage.sectors = infoForStartGame.sectors;
        //     startMessage.dictionary = getLangDictionary(user.lang);
        //     ws.send(JSON.stringify(startMessage));
        //   }
        // );
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
