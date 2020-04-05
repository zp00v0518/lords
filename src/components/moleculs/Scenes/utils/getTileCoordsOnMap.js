// https://ru.stackoverflow.com/questions/823046/%D0%A0%D0%BE%D0%BC%D0%B1%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F-%D0%B8%D0%B7%D0%BE%D0%BC%D0%B5%D1%82%D1%80%D0%B8%D1%8F-%D0%9D%D0%B0%D0%B9%D1%82%D0%B8-%D1%82%D0%BE%D1%87%D0%BA%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D1%81%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D1%8F
// получает индексовые координаты региона на карте
function getTileCoordsOnMap() {
  const halfHeight = this.tileWidth / 2 / 2;
  const isoX = this.isoCoords.x;
  const isoY = this.isoCoords.y;
  const stepX = this.mouseCoords.x - isoX;
  const stepY = this.mouseCoords.y - isoY;
  const topX = 0.5 * stepX - stepY + isoX;
  const topY = 0.5 * stepY - stepX / 4 + isoY;
  const downX = 0.5 * stepX + stepY + isoX;
  const downY = 0.25 * stepX + 0.5 * stepY + isoY;

  let q = Math.pow(topX - isoX, 2) + Math.pow(topY - isoY, 2);
  const l = halfHeight * Math.sqrt(5);
  const lineTop = Math.sqrt(q);
  const rombX = Math.floor(lineTop / l);

  q = Math.pow(downX - isoX, 2) + Math.pow(downY - isoY, 2);
  const lineDown = Math.sqrt(q);
  const rombY = Math.floor(lineDown / l);
  // eslint-disable-next-line
  return { x: rombX, y: rombY };
}

module.exports = getTileCoordsOnMap;
