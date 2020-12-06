const template = require('template_func');
const console = new template.Log(__filename);

function changePowerControlInGlobalMap(collectionName, arr) {
  const GlobalMap = require('../../globalMap/constractGlobalMap');
  const map = GlobalMap[collectionName];
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];
    map[elem.x][elem.y].control = elem.control;
  }
}

module.exports = changePowerControlInGlobalMap;
