function drawHoverLine(rombIndex) {
	let x = rombIndex.x;
	let y = rombIndex.y;
	let obj = this.currentMap[x][y];
	let ctx = this.ctx;
	let tileWidth = this.tileWidth;
	let tileHeight = tileWidth/2;
	let halfHeight = tileHeight/2;
	let centerX = obj.centerX;
	let centerY = obj.centerY;
  var step = 0;
	ctx.strokeStyle = "yellow";
	ctx.beginPath();
	ctx.moveTo(centerX,centerY-halfHeight+step)
	ctx.lineTo(centerX+step-tileHeight,centerY);
	ctx.lineTo(centerX, centerY+halfHeight-step);
	ctx.lineTo(centerX+tileHeight-step,centerY);
	ctx.lineTo(centerX,centerY-halfHeight+step);
	ctx.stroke();
  ctx.closePath();
}

module.exports = drawHoverLine;