const gameVariables = require("./game_variables");
const UserOnline = {};
const appStatistic = {
  request: {
    count: 0
  }
};

global.gameVariables = gameVariables;
global.UserOnline = UserOnline;
global.appStatistic = appStatistic;
