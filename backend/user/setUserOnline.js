const { calcStorageNowValue } = require('../town/storage');
const  getGlobalMapSector = require('../globalMap/getGlobalMapSector');
const getLangDictionary = require('../dictionary/getLangDictionary');
const chat = require('../chat/chat');

function setUserOnline(user, server, info_for_game, ws) {
  const startMessage = {
    status: true,
    type: 'startMessages',
    chat: chat[server].map(item => item)
  };
  startMessage.chat.unshift(chat.template);

  const User = user;
  global.UserOnline[server][User._id] = {};
  global.UserOnline[server][User._id].ws = ws;
  global.UserOnline[server].count++;
  global.UserOnline[server][User._id].user = User;
  info_for_game.sectors.forEach(item => {
    // global.GlobalMap[server][item.x][item.y] = item;
    calcStorageNowValue(item.town.storage);
  });
  global.UserOnline[server][User._id].sectors = info_for_game.sectors;
  global.UserOnline[server][User._id].eventsList = info_for_game.eventsList;
  global.UserOnline[server][User._id].heroesList = info_for_game.heroesList;
  global.UserOnline[server][User._id].user.globalMap = {};
  global.UserOnline[server][User._id].user.globalMap.zoom = 1;
  global.UserOnline[server][User._id].user.globalMap.centerMap = {};
  global.UserOnline[server][User._id].user.globalMap.centerMap.x = info_for_game.sectors[0].x;
  global.UserOnline[server][User._id].user.globalMap.centerMap.y = info_for_game.sectors[0].y;
  getGlobalMapSector(global.UserOnline[server][User._id].user, server, currentMap => {
    startMessage.eventsList = info_for_game.eventsList;
    startMessage.currentMap = currentMap;
    startMessage.sectors = info_for_game.sectors;
    startMessage.heroesList = info_for_game.heroesList;
    startMessage.dictionary = getLangDictionary(user.lang);
    ws.send(JSON.stringify(startMessage));
  });
}

module.exports = setUserOnline;
