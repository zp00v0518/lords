
function drawTown(arrImg){
  const ctx = this.ctx;
  const raceName = this.raceName;
  const img = sourceLoader.sources.towns[raceName][raceName]; 
  drawBackground(ctx, img, parseFloat(this.widthScene), parseFloat(this.heightScene));
  if(arrImg){
    arrImg.forEach(item =>{
      const imgInfo = item.imgInfo;
      const img = imgInfo.img;
      const convert = convertCoords(ctx, imgInfo.coords)
      ctx.drawImage(img, 0,0, img.width/2, img.height, convert.x, convert.y, img.width/2, img.height);
    })
  }
};

export default drawTown;

function drawBackground(ctx, img, width, height){
  ctx.drawImage(img, 0, 0, width, height);
}

function convertCoords(ctx, coords){
  const widthScene = ctx.canvas.width;
  const heightScene = ctx.canvas.height;
  const convert = {
    x: widthScene/100*coords.x,
    y: heightScene/100*coords.y,
  };
  return convert;
}