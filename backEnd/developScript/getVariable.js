function getVariable(str) {
  let d = str.split(".");
  let f = {};
  // console.log(d)
  for (let i = 0; i < d.length; i++) {
    let key = d[i];
    try {
      f = global[key];
    } catch (err) {
      return false;
    }
  }
  if (!f) {
    return false;
  }
  return f;
}
module.exports = getVariable;
