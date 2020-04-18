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

const allMirror = {
  top: (x, y, size) => ({ x, y: y - size }),
  topRight: (x, y, size) => ({ x: x + size, y: y - size }),
  topLeft: (x, y, size) => ({ x: x - size, y: y - size }),
  right: (x, y, size) => ({ x: x + size, y }),
  bottom: (x, y, size) => ({ x, y: y + size }),
  bottomRight: (x, y, size) => ({ x: x + size, y: y + size }),
  bottomLeft: (x, y, size) => ({ x: x - size, y: y + size }),
  left: (x, y, size) => ({ x: x - size, y }),
  current: (x, y) => ({ x, y })
};
function getNearCoords(start, target, sizeMap, tile) {
  const minPath = getMinPath(start, target, sizeMap);
  const shiftX = minPath.x - start.x;
  const shiftY = minPath.y - start.y;
  const isoX = (shiftX + shiftY) / 2;
  const isoY = (shiftX - shiftY) / 2;
  minPath.centerX = start.centerX + isoX * tile.width;
  minPath.centerY = start.centerY - isoY * tile.height;
  return minPath;
}

function getMinPath(start, target, size) {
  const result = [];
  const lengthArr = [];
  Object.keys(allMirror).forEach(key => {
    const method = allMirror[key];
    const coords = method(target.x, target.y, size);
    const length = getStraightLength(start.x, start.y, coords.x, coords.y);
    lengthArr.push(length);
    const temp = {
      ...coords,
      length,
      way: key
    };
    result.push(temp);
  });
  const min = Math.min(...lengthArr);
  const index = lengthArr.indexOf(min);
  return result[index];
}
export default { getPointOnStraight, getStraightLength, getNearCoords };
