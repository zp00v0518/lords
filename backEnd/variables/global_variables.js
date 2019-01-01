const gameVariables = require("./game_variables");
const {config} = require("../tube");

const UserOnline = {};

const appStatistic = {
  request: {
    count: 0
  }
};

config.db.collections.servers.forEach(serverName => {
  UserOnline[serverName] = {};
  UserOnline[serverName].count = 0;
})


global.gameVariables = gameVariables;
global.UserOnline = UserOnline;
global.appStatistic = appStatistic;
