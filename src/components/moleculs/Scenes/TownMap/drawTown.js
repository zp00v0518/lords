const WIDTH = 800; // базовые размеры canvas , на основании которого, формировался первоначальный вид рисунка
const HEIGHT = 374;
let scale_X = 1; // масштаб, по отношени. к базовым размерам
let scale_Y = 1;

function drawTown(arrImg){
  const ctx = this.ctx;
  scale_X = ctx.canvas.width / WIDTH;
  scale_Y = ctx.canvas.height / HEIGHT;
  const raceName = this.raceName;
  const img = sourceLoader.sources.towns[raceName][raceName]; 
  drawBackground(ctx, img, parseFloat(this.widthScene), parseFloat(this.heightScene));
  if(arrImg){
    arrImg.forEach(item =>{
      const imgInfo = item.imgInfo;
      const coords = imgInfo.coords;
      const img = imgInfo.img;
      const convert = convertCoords(ctx, imgInfo.coords)
      ctx.drawImage(img, 0,0, img.width/2, img.height, coords.x * scale_X, coords.y * scale_Y, img.width/2 * scale_X, img.height * scale_Y);
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