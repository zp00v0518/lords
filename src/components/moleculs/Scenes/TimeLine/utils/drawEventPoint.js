function drawEventPoint(position) {
  this.ctx.beginPath();
  this.ctx.strokeStyle = 'red';
  this.ctx.moveTo(position, 30);
  this.ctx.lineTo(position, 0);
  this.ctx.stroke();
  this.ctx.strokeStyle = 'black';
  this.ctx.closePath();
}

export default drawEventPoint;
