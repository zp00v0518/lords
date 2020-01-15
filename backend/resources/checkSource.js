function checkSource(sourceArr, storage) {
  if (Array.isArray(sourceArr)) {
    let flag = true;
    for (let i = 0; i < sourceArr.length; i++) {
      const type = sourceArr[i].resource;
      const value = +sourceArr[i].value;
      if (storage[type].nowValue < value) {
        flag = false;
        break;
      }
    }
    return flag;
  } else {
    const flag = Object.keys(sourceArr).some(type => {
      const value = sourceArr[type];
      return storage[type].nowValue < value;
    });
    return !flag;
  }
}

module.exports = checkSource;
