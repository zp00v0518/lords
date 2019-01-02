require("../variables/global_variables.js");
const {
  config,
  findUserInDB,
  getInfoForStartGame,
  getGlobalMapSector
} = require("../tube.js");
const tube = require("../tube.js");
const WS = require("ws");
const watcher = require("../liveReload/watchFs.js");
const Cookies = require("cookies");
const chat = [];

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
  
  const server = req.url.split("/")[1];
  const cookies = new Cookies(req);
  const userCookies = cookies.get("user");
  let User;
  const start = {
    status: 'success',
    type: "startMessages",
    chat
  };
  findUserInDB(userCookies).then(user => {
    User = user;
    UserOnline[server][User._id] = {};
    UserOnline[server][User._id].ws = ws;
    UserOnline[server].count++;
    UserOnline[server][User._id].user = User;
    getInfoForStartGame(user, server).then(infoForStartGame => {
      UserOnline[server][User._id].user.map = {};
      UserOnline[server][User._id].user.map.zoom = 1;
      UserOnline[server][User._id].user.map.centerMap = {};
      UserOnline[server][User._id].user.map.centerMap.x = infoForStartGame[0].x;
      UserOnline[server][User._id].user.map.centerMap.y = infoForStartGame[0].y;
      getGlobalMapSector(UserOnline[server][User._id].user, server, currentMap => {
          start.currentMap = currentMap;
          start.towns = infoForStartGame;
          ws.send(JSON.stringify(start)); 
        }
      );
    });
  });

  ws.on("close", function() {
    delete UserOnline[server][User._id];
    UserOnline[server].count--;
  });
  ws.on("message", message => {
    const mess = JSON.parse(message);
    mess.type = "chatMessage";
    mess.author = "Admin";
    mess.status = 'success',
    mess.time = new Date();
    if (chat.length > 30) chat.pop();
    chat.unshift(mess);

    for (let key in UserOnline[server]) {
      if (key !== "count") {
        UserOnline[server][key].ws.send(JSON.stringify(mess));
      }
    }
  });
});

function callbackForWatcher() {
  watcher(config.watchFolder, callbackForWatcher);
  Object.keys(UserOnline).forEach(server => {
    if (UserOnline[server].count > 0) {
      const message = {
        status: 'success',
        type: "change"
      };
      for (let user in UserOnline[server]) {
        if (user !== "count") {
          UserOnline[server][user].ws.send(JSON.stringify(message));
        }
      }
    }
  })
  
}
watcher(config.watchFolder, callbackForWatcher);
