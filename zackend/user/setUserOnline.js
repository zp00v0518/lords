const { calcStorageNowValue } = require('../town/storage');
const { getGlobalMapSector } = require('../globalMap');
const getLangDictionary = require('../dictionary/getLangDictionary');
const chat = require('../chat/chat');

function setUserOnline(user, server, info_for_game, ws) {
  const startMessage = {
    status: true,
    type: 'startMessages',
    chat: chat[server].map(item => item)
  };
  startMessage.chat.unshift(chat.template);

  User = user;
  UserOnline[server][User._id] = {};
  UserOnline[server][User._id].ws = ws;
  UserOnline[server].count++;
  UserOnline[server][User._id].user = User;
  info_for_game.sectors.forEach(item => {
    GlobalMap[server][item.x][item.y] = item;
    calcStorageNowValue(item.town.storage);
  });
  UserOnline[server][User._id].sectors = info_for_game.sectors;
  UserOnline[server][User._id].eventsList = info_for_game.eventsList;
  UserOnline[server][User._id].user.globalMap = {};
  UserOnline[server][User._id].user.globalMap.zoom = 1;
  UserOnline[server][User._id].user.globalMap.centerMap = {};
  UserOnline[server][User._id].user.globalMap.centerMap.x =
    info_for_game.sectors[0].x;
  UserOnline[server][User._id].user.globalMap.centerMap.y =
    info_for_game.sectors[0].y;
  getGlobalMapSector(UserOnline[server][User._id].user, server, currentMap => {
    startMessage.eventsList = info_for_game.eventsList;
    startMessage.currentMap = currentMap;
    startMessage.sectors = info_for_game.sectors;
    startMessage.heroes = info_for_game.heroes;
    startMessage.dictionary = getLangDictionary(user.lang);
    ws.send(JSON.stringify(startMessage));
  });
}

module.exports = setUserOnline;
