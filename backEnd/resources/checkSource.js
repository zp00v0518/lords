function checkSource(sourceArr, sources) {
  let flag = true;
  for (let i = 0; i < sourceArr.length; i++) {
    const type = sourceArr[i].resource;
    const value = +sourceArr[i].value;
    if (sources[type].nowValue < value) {
      flag = false;
      break;
    }
  }
  return flag;
}

module.exports = checkSource;