const gameVariables = require('./game_variables');
global.gameVariables = gameVariables;
const config = require('../config');
// const GlobalMap = require('../globalMap/constractGlobalMap');
const { GlobalMap } = require('../tube');
const UserOnline = {};

const appStatistic = {
  request: {
    count: 0
  }
};

config.db.collections.servers.forEach(server => {
  const serverName = server.collectionName;
  UserOnline[serverName] = {};
  UserOnline[serverName].count = 0;
});

global.UserOnline = UserOnline;
global.appStatistic = appStatistic;

function setGlobalMap() {
  if (!GlobalMap) {
    setGlobalMap();
  } else {
    global.GlobalMap = GlobalMap;
  }
}

setTimeout(function() {
  setGlobalMap();
}, 500);
