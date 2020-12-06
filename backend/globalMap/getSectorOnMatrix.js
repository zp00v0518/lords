function getSectorOnMatrix(arrLength, rangeSize, center) {
  const curRangeSize = rangeSize % 2 !== 0 ? rangeSize : rangeSize + 1;
  const halfSize = Math.floor(curRangeSize / 2);
  let nowX = center.x - halfSize;
  let nowY = center.y - halfSize;
  let length = arrLength;
  if (nowX < 0) nowX += length;
  if (nowY < 0) nowY += length;
  const result = [];
  for (let i = 0; i < curRangeSize; i++) {
    result[i] = [];
    for (let j = 0; j < curRangeSize; j++) {
      const x = (nowX + i) % length;
      const y = (nowY + j) % length;
      result[i].push({ x, y });
    }
  }
  return result;
}

module.exports = getSectorOnMatrix;
