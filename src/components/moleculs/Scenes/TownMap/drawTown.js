/* eslint-disable */
function drawTown(arrImg) {
  const ctx = this.ctx;
  const scale_X = this.scale_X;
  const scale_Y = this.scale_Y;
  const raceName = this.raceName;
  const bg = sourceLoader.sources.towns[raceName][raceName];
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawBackground(
    ctx,
    bg,
    parseFloat(this.widthScene),
    parseFloat(this.heightScene)
  );
  if (arrImg) {
    arrImg.forEach(item => {
      const imgInfo = item.imgInfo;
      const coords = imgInfo.coords;
      const img = imgInfo.img;
      const arrForDraw = [
        img,
        0,
        0,
        img.width / 2,
        img.height,
        coords.x * scale_X,
        coords.y * scale_Y,
        (img.width / 2) * scale_X,
        img.height * scale_Y
      ];
      if (imgInfo.is_default) {
        arrForDraw[3] = img.width;
      }
      ctx.drawImage(...arrForDraw);
      if (this.hover && item === this.hover) {
        arrForDraw[1] = img.width / 2;
        arrForDraw[3] = img.width;
        arrForDraw[7] = img.width * scale_X;
        ctx.drawImage(...arrForDraw);
      }
    });
  }
}

export default drawTown;

function drawBackground(ctx, img, width, height) {
  ctx.drawImage(img, 0, 0, width, height);
}
