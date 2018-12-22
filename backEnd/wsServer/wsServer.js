require("../variables/global_variables.js");
const { config } = require("../tube.js");
const WS = require("ws");
const watcher = require("../liveReload/watchFs.js");
const chat = [];

const userOnline = {
  count: 0
};

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
wsServer.on("connection", (ws, res) => {
  const id = Math.random();
  userOnline[id] = ws;
  userOnline.count++;
  const start = {
    type: "startMessages",
    chat
  };
  ws.send(JSON.stringify(start));

  ws.on("close", function() {
    delete userOnline[id];
    userOnline.count--;
  });
  ws.on("message", message => {
    const mess = JSON.parse(message);
    mess.type = "chatMessage";
    mess.author = "Admin";
    mess.time = new Date();
    if (chat.length > 30) chat.pop();
    chat.unshift(mess);

    for (let key in userOnline) {
      if (key !== "count") {
        userOnline[key].send(JSON.stringify(mess));
      }
    }
  });
});

function callbackForWatcher() {
  watcher(config.watchFolder, callbackForWatcher);
  if (userOnline.count > 0) {
    const message = {
      type: "change"
    };
    for (let user in userOnline) {
      if (user !== "count") {
        userOnline[user].send(JSON.stringify(message));
      }
    }
  }
}
watcher(config.watchFolder, callbackForWatcher);
