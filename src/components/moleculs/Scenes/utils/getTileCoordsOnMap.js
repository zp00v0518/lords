// https://ru.stackoverflow.com/questions/823046/%D0%A0%D0%BE%D0%BC%D0%B1%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F-%D0%B8%D0%B7%D0%BE%D0%BC%D0%B5%D1%82%D1%80%D0%B8%D1%8F-%D0%9D%D0%B0%D0%B9%D1%82%D0%B8-%D1%82%D0%BE%D1%87%D0%BA%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D1%81%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D1%8F
// получает индексовые координаты региона на карте
function getTileCoordsOnMap() {
  const { mouseCoords, tileWidth } = this;
  const height = tileWidth / 2;
  const startX = this.isoCoords.x;
  const startY = this.isoCoords.y;
  const iX = (mouseCoords.x - startX) / height;
  const iY = (mouseCoords.y - startY) / height;
  const rX = getDecartX(iX, iY);
  const rY = getDecartY(iX, iY);
  return { x: Math.floor(rX), y: Math.floor(rY) };
}

function getDecartX(isoX, isoY) {
  return (2 * isoY + isoX) / 2;
}

function getDecartY(isoX, isoY) {
  return (2 * isoY - isoX) / 2;
}

module.exports = getTileCoordsOnMap;
