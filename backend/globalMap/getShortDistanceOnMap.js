function getShortDistanceOnMap(x1, y1, x2, y2, size) {
  const clamp = v => (v > size / 2 ? size - v : v);
  const dx = clamp(Math.abs(x1 - x2));
  const dy = clamp(Math.abs(y1 - y2));
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance;
}

module.exports = getShortDistanceOnMap;
