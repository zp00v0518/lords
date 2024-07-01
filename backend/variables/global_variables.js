import gameVariables from './game_variables.js';
global.gameVariables = gameVariables;
import config from '../config/config.js';
// const GlobalMap = require('../globalMap/constractGlobalMap');
// const { GlobalMap } = require('../tube');
import { returnGlobalMap } from './globalMap/index.js'
const GlobalMap = returnGlobalMap;
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

setTimeout(function () {
  setGlobalMap();
}, 500);
