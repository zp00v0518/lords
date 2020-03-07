function getStraightLength(x1, y1, x2, y2) {
  let q = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
  return Math.sqrt(q);
}

function getPointOnStraight(x1, y1, x2, y2, r) {
  const len = getStraightLength(x1, y1, x2, y2);
  const k = r / len;
  const x = x1 + (x2 - x1) * k;
  const y = y1 + (y2 - y1) * k;
  return { x, y };
}
export default { getPointOnStraight, getStraightLength };
