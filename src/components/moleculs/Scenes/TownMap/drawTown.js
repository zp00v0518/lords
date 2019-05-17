function drawTown(){
  const ctx = this.ctx;
  const raceName = this.raceName;
  const img = sourceLoader.sources.towns[raceName][raceName];
  drawBackground(ctx, img, parseFloat(this.widthScene), parseFloat(this.heightScene))
};

export default drawTown;

function drawBackground(ctx, img, width, height){
  ctx.drawImage(img, 0, 0, width, height);
}