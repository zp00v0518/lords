function drawTown(arrImg) {
  console.log(arrImg)
  const ctx = this.ctx;
  const scale_X = this.scale_X;
  const scale_Y = this.scale_Y;
  const raceName = this.raceName;
  const bg = sourceLoader.sources.towns[raceName][raceName];
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
        img.height * scale_Y]
      if(imgInfo.is_default){
        arrForDraw[3] = img.width;
      }
      ctx.drawImage(...arrForDraw);
    });
  }
}

export default drawTown;

function drawBackground(ctx, img, width, height) {
  ctx.drawImage(img, 0, 0, width, height);
}

