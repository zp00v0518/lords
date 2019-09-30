const { getGlobalMapSector } = require("../tube.js");

function moveGlobalMap(message, info, callback = function() {}) {
    const { player, server } = info;
    const { way, zoom} = message;
    const { user, ws } = player;
    user.globalMap.zoom = zoom || 1;
    let step = Math.floor(gameVariables.stepMoveGlobalMap * user.globalMap.zoom);
    // console.log(`centerX:${user.globalMap.centerMap.x}   centerY:${user.globalMap.centerMap.y}`)
    let nowX = user.globalMap.centerMap.x;
    let nowY = user.globalMap.centerMap.y;
    if (way == "top") {
      user.globalMap.centerMap.x = nowX + step;
      if (nowX + step > GlobalMap[server].length - 1) {
        user.globalMap.centerMap.x = nowX + step - GlobalMap[server].length;
      }
    } else if (way === "bottom") {
      user.globalMap.centerMap.x = nowX - step;
      if (nowX - step < 0) {
        user.globalMap.centerMap.x = GlobalMap[server].length - Math.abs(nowX - step);
      }
    } else if (way === "left") {
      user.globalMap.centerMap.y = nowY - step;
      if (nowY - step < 0) {
        user.globalMap.centerMap.y = GlobalMap[server].length - Math.abs(nowY - step);
      }
    } else if (way === "right") {
      user.globalMap.centerMap.y = nowY + step;
      if (nowY + step > GlobalMap[server].length - 1) {
        user.globalMap.centerMap.y = nowY + step - GlobalMap[server].length;
      }
    }
    // console.log(`X:${user.globalMap.centerMap.x}  Y:${user.globalMap.centerMap.y}`)
    getGlobalMapSector(user, server, result => {
      const response ={
        type: message.type,
        status: true,
        currentMap: result,
      }
      ws.send(JSON.stringify(response))
      return 
    });
}

module.exports = moveGlobalMap;
