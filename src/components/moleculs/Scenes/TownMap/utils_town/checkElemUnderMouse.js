function checkElemUnderMouse(
  mouseX,
  mouseY,
  imgArr,
  helperCtx,
  scale_X = 1,
  scale_Y = 1
) {
  let hover = null;
  for (let i = imgArr.length - 1; i >= 0; i--) {
    const item = imgArr[i];
    const imgInfo = item.imgInfo;
    if (!imgInfo.is_default) {
      const onBuilding = checkMouseOnElem(
        mouseX,
        mouseY,
        imgInfo,
        helperCtx,
        scale_X,
        scale_Y
      );
      if (onBuilding) {
        const x = mouseX - imgInfo.coords.x * scale_X;
        const y = mouseY - imgInfo.coords.y * scale_Y;
        const pix = imgInfo.picCtx.getImageData(x, y, 1, 1).data;
        const alpha = pix[3];
        if (alpha > 0) {
          hover = item;
          break;
        }
      }
    }
  }
  return hover;
}

export default checkElemUnderMouse;

function checkMouseOnElem(
  mouseX,
  mouseY,
  imgInfo,
  ctx,
  scale_X = 1,
  scale_Y = 1
) {
  const topX = imgInfo.coords.x * scale_X;
  const topY = imgInfo.coords.y * scale_Y;
  const leftX = topX;
  const leftY = topY + imgInfo.picCtx.canvas.height;
  const rigthX = topX + imgInfo.picCtx.canvas.width;
  const rigthY = topY;
  const bottomX = rigthX;
  const bottomY = leftY;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  // ctx.strokeStyle = "transparent";
  ctx.moveTo(leftX, leftY);
  ctx.lineTo(topX, topY);
  ctx.lineTo(rigthX, rigthY);
  ctx.lineTo(bottomX, bottomY);
  ctx.lineTo(leftX, leftY);
  ctx.stroke();
  ctx.closePath();
  return ctx.isPointInPath(mouseX, mouseY);
}
