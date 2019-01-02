function drawMap() {
  let mapArr = this.currentMap;
  let ctx = this.ctx;
  ctx.clearRect(0,0, this.widthScene, this.heightScene);
  let tileWidth = 72;
  let tileHeight = 36
  let halfHeight = 18
  //сдвиг начала оси Х влево
  // target.setIsoCoords(0 -tileHeight*2.5, scene.height/2);
  let startX = 0;
  let startY = parseInt(this.widthScene)/2;
  let startCenterX = startX + tileHeight;
  let startCenterY = startY;
  for (let i = 0; i < mapArr.length; i++) {
    for (let h = 0; h < mapArr[i].length; h++) {
      let centerX = startCenterX + 2 * halfHeight * (i + h);
      let centerY = startCenterY - halfHeight * (i - h);
      try {
        this.currentMap[i][h].centerX = centerX;
      } catch (error) {
        console.log(`i:${i}  h:${h}`);
        console.log(this.currentMap);
      }
      this.currentMap[i][h].centerY = centerY;
      drawRectAroundCenter(centerX, centerY, mapArr[i][h].type, ctx);
    }
  }
}
 const grid = {
		0: "green",
		1:"blue",
		2:"brown",
	};

function drawRectAroundCenter(centerX, centerY, grid, ctx) {
  let tileWidth = 72;
  let tileHeight = 36;
  let halfHeight = 18;
  var step = 0;
  // console.log(`centerX:${centerX} centerY:${centerY}`)
  ctx.beginPath();
  ctx.fillStyle = grid[grid];
  ctx.strokeStyle = "black";
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
export default drawMap;
