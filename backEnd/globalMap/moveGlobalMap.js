const { getGlobalMapSector } = require("../tube.js");

function moveGlobalMap(message, info, callback = function() {}) {
    // console.log("********** moveGlobalMap Work ************");
    const { player, server } = info;
    const { way } = message;
    const { user, ws } = player;
    let step = Math.floor(gameVariables.stepMoveGlobalMap * user.globalMap.zoom);
    // console.log(`centerX:${user.globalMap.centerMap.x}   centerY:${user.globalMap.centerMap.y}`)
    let nowX = user.globalMap.centerMap.x;
    let nowY = user.globalMap.centerMap.y;
    if (way == "top") {
      user.globalMap.centerMap.x = nowX + step;
      if (nowX + step > GlobalMap.length - 1) {
        user.globalMap.centerMap.x = nowX + step - GlobalMap.length;
      }
    } else if (way == "bottom") {
      user.globalMap.centerMap.x = nowX - step;
      if (nowX - step < 0) {
        user.globalMap.centerMap.x = GlobalMap.length - Math.abs(nowX - step);
      }
    } else if (way == "left") {
      user.globalMap.centerMap.y = nowY - step;
      if (nowY - step < 0) {
        user.globalMap.centerMap.y = GlobalMap.length - Math.abs(nowY - step);
      }
    } else if (way == "right") {
      user.globalMap.centerMap.y = nowY + step;
      if (nowY + step > GlobalMap.length - 1) {
        user.globalMap.centerMap.y = nowY + step - GlobalMap.length;
      }
    }
    // console.log(`X:${user.globalMap.center.x}  Y:${user.globalMap.center.y}`)
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
