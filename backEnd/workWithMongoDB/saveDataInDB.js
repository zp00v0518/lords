const tube = require('../tube.js');
// const updateStateRegion = require("../tube.js").updateStateRegion;
const serverList = gameVariables.serverList;

function saveDataInDB(param) {
  // console.log("********** saveDataInDB ************");
  if (param.target == 'all') {
    for (let i = 0; i < serverList.length; i++) {
      const serverName = serverList[i].collectionName;
      if (UserOnline[serverName].count > 0) {
        const arr = Object.keys(UserOnline[serverName]).filter(
          item => item !== 'count'
        );
        // в данном месте возможно падение сервера, если в момент обновления БД пользователь уйдет в оффлайн
        // в таком случае ключ пользователя будет в рекурсивном массиве, а в списке UserOnline он уже будет недоступен
        recursiveTwo(0, 0, arr, serverName, () => {
          console.log('Все замки обновлены');
        });
      }
    }
  }
}

module.exports = saveDataInDB;

function recursiveTwo(h, i, arr, serverName, callback = function() {}) {
  if (h < arr.length) {
    const userId = arr[h];
    let sectors = UserOnline[serverName][userId].sectors;
    recursiveOne(i, sectors, serverName, () => {
      h++;
      recursiveTwo(h, i, arr, serverName, callback);
    });
  } else {
    callback();
  }
}

function recursiveOne(i, arr, serverName, callback) {
  if (i < arr.length) {
    const { upfateStateSector } = tube;
    const sector = arr[i];
    upfateStateSector(sector, serverName)
      .then(result => {
        i++;
        recursiveOne(i, arr, serverName, callback);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    callback();
  }
}
