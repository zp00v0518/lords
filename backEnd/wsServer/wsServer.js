require("../variables/global_variables.js");
const { config, findUserInDB } = require("../tube.js");
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
  const cookies = new Cookies(req);
  const userCookies = cookies.get("user");
  findUserInDB(userCookies).then(user => {
    // console.log(user)
  })
  UserOnline[userCookies] =  {};
  UserOnline[userCookies].ws =  ws;
  UserOnline.count++;
  const start = {
    type: "startMessages",
    chat
  };
  ws.send(JSON.stringify(start));

  ws.on("close", function() {
    delete UserOnline[userCookies];
    UserOnline.count--;
  });
  ws.on("message", message => {
    const mess = JSON.parse(message);
    mess.type = "chatMessage";
    mess.author = "Admin";
    mess.time = new Date();
    if (chat.length > 30) chat.pop();
    chat.unshift(mess);

    for (let key in UserOnline) {
      if (key !== "count") {
        UserOnline[key].ws.send(JSON.stringify(mess));
      }
    }
  });
});

function callbackForWatcher() {
  watcher(config.watchFolder, callbackForWatcher);
  if (UserOnline.count > 0) {
    const message = {
      type: "change"
    };
    for (let user in UserOnline) {
      if (user !== "count") {
        UserOnline[user].ws.send(JSON.stringify(message));
      }
    }
  }
}
watcher(config.watchFolder, callbackForWatcher);
