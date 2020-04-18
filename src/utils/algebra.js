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
function getNearCoords(start, target, tile, size) {
  const minPath = getMinPath(start, target, size);
  const screen = {
    x: minPath.end.x * tile.width,
    y: minPath.end.y * tile.height
  };
  minPath.end.screen = {};
  minPath.end.screen = {
    x: minPath.start.screen.x + screen.x,
    y: minPath.start.screen.y + screen.y
  };
  return minPath.end;
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
      start,
      end: coords,
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
