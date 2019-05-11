function drawMap() {
  let mapArr = this.currentMap;
  let ctx = this.ctx;
  ctx.clearRect(0, 0, this.widthScene, this.heightScene);
  let tileWidth = this.tileWidth;
  let tileHeight = tileWidth / 2;
  let halfHeight = tileHeight / 2;
  // console.log(`tileWidth:${tileWidth} tileHeight:${tileHeight} halfHeight:${halfHeight}`)
  // сдвиг начала оси Х влево
  let startX = this.isoCoords.x;
  let startY = this.isoCoords.y;
  let startCenterX = startX + tileHeight;
  let startCenterY = startY;

  for (let i = 0; i < mapArr.length; i++) {
    for (let h = 0; h < mapArr[i].length; h++) {
      let centerX = startCenterX + 2 * halfHeight * (i + h);
      let centerY = startCenterY - halfHeight * (i - h);
      this.currentMap[i][h].centerX = centerX;
      // console.log(`tileWidth:${tileWidth} tileHeight:${tileHeight} halfHeight:${halfHeight}`)
      this.currentMap[i][h].centerY = centerY;
      drawRectAroundCenter(centerX, centerY, mapArr[i][h].type);
    }
  }
  function drawRectAroundCenter(centerX, centerY, grid) {
    const step = 0;
    // console.log(`centerX:${centerX} centerY:${centerY}`)
    ctx.beginPath();
    ctx.fillStyle = colors[grid];
    ctx.strokeStyle = 'black';
    ctx.moveTo(centerX, centerY - halfHeight + step);
    ctx.lineTo(centerX + step - tileHeight, centerY);
    ctx.lineTo(centerX, centerY + halfHeight - step);
    ctx.lineTo(centerX + tileHeight - step, centerY);
    ctx.lineTo(centerX, centerY - halfHeight + step);
    ctx.stroke();

    ctx.fill();
    ctx.closePath();
    // drawCircle(centerX,centerY,ctx)
  }
}
const colors = {
  0: 'green',
  1: 'blue',
  2: 'brown',
  3: 'black'
};

export default drawMap;
