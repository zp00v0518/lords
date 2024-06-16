function getDecartX(isoX, isoY) {
  return (2 * isoY + isoX) / 2;
}

function getDecartY(isoX, isoY) {
  return (2 * isoY - isoX) / 2;
}
function getIsoX(x, y) {
  return x - y;
}
function getIsoY(x, y) {
  return (x + y) / 2;
}
function addCenterPoints(base, target, tileHeight) {
  const shiftX = target.x - base.x;
  const shiftY = target.y - base.y;
  const isoX = getIsoX(shiftX, shiftY);
  const isoY = getIsoY(shiftX, shiftY);
  target.centerX = base.centerX + tileHeight * isoX;
  target.centerY = base.centerY + tileHeight * isoY;
  return target;
}

export default { getDecartX, getDecartY, getIsoX, getIsoY, addCenterPoints };
