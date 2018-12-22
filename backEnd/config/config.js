const path = require("path");
module.exports = {
  port: {
    http: 3001,
    ws: 3002
  },
  watchFolder: path.resolve(__dirname, "../../frontEnd"),
  db: {
    check: false,
    name: "lords",
    collections: {
      users: "users",
      session: "session",
      servers: ["server_1", "server_2"]
    }
  },
  cookieSize: 10,
  basePathToFiles: "frontEnd", //папка, в которой находятся файлы для клиента
  time: {
    sec: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
    month: 1000 * 60 * 60 * 24 * 31
  },
  listFile: {
    html: {
      login: "login",
      user: "user",
      err: "404",
      game: "game"
    }
  }
};
