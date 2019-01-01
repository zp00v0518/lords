require("../variables/global_variables.js");
const { config, findUserInDB, getInfoForStartGame } = require("../tube.js");
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
    type: "startMessages",
    chat
  };
  findUserInDB(userCookies).then(user => {
    User = user;
    UserOnline[server][User._id] = {};
    UserOnline[server][User._id].ws = ws;
    UserOnline[server].count++;
    getInfoForStartGame(user, server).then(result => {
      console.log(result)
    });
    ws.send(JSON.stringify(start));
  });

  ws.on("close", function() {
    delete UserOnline[server][User._id];
    UserOnline[server].count--;
  });
  ws.on("message", message => {
    const mess = JSON.parse(message);
    mess.type = "chatMessage";
    mess.author = "Admin";
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
  if (UserOnline[server].count > 0) {
    const message = {
      type: "change"
    };
    for (let user in UserOnline[server]) {
      if (user !== "count") {
        UserOnline[server][user].ws.send(JSON.stringify(message));
      }
    }
  }
}
watcher(config.watchFolder, callbackForWatcher);
