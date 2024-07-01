function changePowerControlInGlobalMap(collectionName, arr) {
  const GlobalMap = import('../../globalMap/constractGlobalMap.js');
  const map = GlobalMap[collectionName];
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];
    map[elem.x][elem.y].control = elem.control;
  }
}

export default changePowerControlInGlobalMap;
