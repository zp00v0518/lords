function getLengthBeetweenTwoPoint(x1, y1, x2, y2) {
  let q = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
  return Math.sqrt(q);
}

module.exports = getLengthBeetweenTwoPoint;
