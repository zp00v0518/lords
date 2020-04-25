const { getGlobalMapSector } = require('../tube.js');

function moveGlobalMap(message, info, callback = function() {}) {
  const { player, server } = info;
  const { way, zoom } = message;
  const { user, ws } = player;
  user.globalMap.zoom = zoom || 1;
  let step = Math.floor(gameVariables.stepMoveGlobalMap * user.globalMap.zoom);
  // console.log(`centerX:${user.globalMap.centerMap.x}   centerY:${user.globalMap.centerMap.y}`)
  let nowX = user.globalMap.centerMap.x;
  let nowY = user.globalMap.centerMap.y;
  if (way === 'right') {
  // if (way === 'top') {
    const newPosition = nowX + step;
    user.globalMap.centerMap.x = newPosition;
    if (newPosition > GlobalMap[server].length - 1) {
      user.globalMap.centerMap.x = newPosition - GlobalMap[server].length;
    }
  } else if (way === 'left') {
  // } else if (way === 'bottom') {
    const newPosition = nowX - step;
    user.globalMap.centerMap.x = newPosition;
    if (newPosition < 0) {
      user.globalMap.centerMap.x = GlobalMap[server].length - Math.abs(newPosition);
    }
  } else if (way === 'top') {
  // } else if (way === 'left') {
    const newPosition = nowY - step;
    user.globalMap.centerMap.y = newPosition;
    if (newPosition < 0) {
      user.globalMap.centerMap.y = GlobalMap[server].length - Math.abs(newPosition);
    }
  } else if (way === 'bottom') {
  // } else if (way === 'right') {
    const newPosition = nowY + step;
    user.globalMap.centerMap.y = newPosition;
    if (newPosition > GlobalMap[server].length - 1) {
      user.globalMap.centerMap.y = newPosition - GlobalMap[server].length;
    }
  }
  // console.log(`X:${user.globalMap.centerMap.x}  Y:${user.globalMap.centerMap.y}`)
  getGlobalMapSector(user, server, result => {
    const response = {
      type: message.type,
      status: true,
      currentMap: result
    };
    ws.send(JSON.stringify(response));
    return;
  });
}

module.exports = moveGlobalMap;
