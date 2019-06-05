function checkElemUnderMouse(mouseX, mouseY, imgArr, helperCtx, scale_X = 1, scale_Y = 1) {
  for (let i = imgArr.length - 1; i >= 0; i--) {
    const item = imgArr[i];
    const imgInfo = item.imgInfo;
    if (!imgInfo.is_default) {
      const f = checkMouseOnElem(imgInfo, helperCtx, scale_X, scale_Y);
      console.log(f)
      const pix = imgInfo.picCtx.getImageData(mouseX, mouseY, 1,1);
      console.log(pix)
    }
  }
}

export default checkElemUnderMouse;


function checkMouseOnElem(imgInfo, ctx, scale_X = 1, scale_Y = 1) {
  const topX = imgInfo.coords.x * scale_X;
  const topY = imgInfo.coords.y * scale_Y;
  const leftX = topX;
  const leftY = topY + (ctx.canvas.height);
  const rigthX = topX + (ctx.canvas.width);
  const rigthY = topY;
  const bottomX = rigthX;
  const bottomY = leftY;
  ctx.beginPath();
  // ctx.strokeStyle = 'red';
  ctx.strokeStyle = "transparent";
  ctx.moveTo(leftX, leftY);
  ctx.lineTo(topX, topY);
  ctx.lineTo(rigthX, rigthY);
  ctx.lineTo(bottomX, bottomY);
  ctx.lineTo(leftX, leftY);
  ctx.stroke();
  ctx.closePath();
  return ctx.isPointInPath(mouseX, mouseY);
}