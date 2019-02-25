require("../variables/global_variables.js");
const allHandler = require("./allHandler.js");
const chat = require("../chat/chat.js");
const getLangDictionary = require("../dictionary/getLangDictionary");
const {
  config,
  findUserInDB,
  getInfoForStartGame,
  getGlobalMapSector,
  formListUpgrade,
  formEventsList,
} = require("../tube.js");
const WS = require("ws");
const watcher = require("../liveReload/watchFs.js");
const Cookies = require("cookies");
const {tryJsonParse} = require('template_func');
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
wsServer.init(config.port.ws);
wsServer.on("connection", (ws, req) => {
  const server = getCollectionName(req.url.split("/")[1]);
  const cookies = new Cookies(req);
  const userCookies = cookies.get("user");
  let User;
  const start = {
    status: true,
    type: "startMessages",
    chat
  };
  findUserInDB(userCookies).then(user => {
    if (user) {
      User = user;
      UserOnline[server][User._id] = {};
      UserOnline[server][User._id].ws = ws;
      UserOnline[server].count++;
      UserOnline[server][User._id].user = User;
      getInfoForStartGame(user, server).then(infoForStartGame => {
        infoForStartGame.forEach(item => {
          formListUpgrade(item)
          GlobalMap[server][item.x][item.y] = item;
        });
        UserOnline[server][User._id].sectors = infoForStartGame;
        UserOnline[server][User._id].user.globalMap = {};
        UserOnline[server][User._id].user.globalMap.zoom = 1;
        UserOnline[server][User._id].user.globalMap.centerMap = {};
        UserOnline[server][User._id].user.globalMap.centerMap.x =
          infoForStartGame[0].x;
        UserOnline[server][User._id].user.globalMap.centerMap.y =
          infoForStartGame[0].y;
        getGlobalMapSector(
          UserOnline[server][User._id].user,
          server,
          currentMap => {
      formEventsList( UserOnline[server][User._id])
            start.currentMap = currentMap;
            start.sectors = infoForStartGame;
            start.dictionary = getLangDictionary(user.lang);
            ws.send(JSON.stringify(start));
          }
        );
      });
    } else {
      const message = {
        status: false,
        redirectUrl: "/"
      };
      ws.send(JSON.stringify(message));
    }
  });

  ws.on("close", function() {
    if (User) {
      delete UserOnline[server][User._id];
      UserOnline[server].count--;
    }
  });
  ws.on("message", message => {
    const mess = tryJsonParse(message);
    if (!mess) {
      console.log("Не удалось распарсить строку пришедшую от клиента")
      ws.send(message);
    }
    const baseInfo = {
      player: UserOnline[server][User._id],
      server,
      userCookies
    };
    if (allHandler[mess.type]) {
      allHandler[mess.type](mess, baseInfo);
    } else {
      ws.send(message);
    }
  });
});

function callbackForWatcher() {
  watcher(config.watchFolder, callbackForWatcher);
  Object.keys(UserOnline).forEach(server => {
    if (UserOnline[server].count > 0) {
      const message = {
        status: true,
        type: "reload"
      };
      for (let user in UserOnline[server]) {
        if (user !== "count") {
          UserOnline[server][user].ws.send(JSON.stringify(message));
        }
      }
    }
  });
}
watcher(config.watchFolder, callbackForWatcher);
