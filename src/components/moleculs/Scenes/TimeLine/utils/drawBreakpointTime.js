function drawBreakpointTime(ctx, breakpoint) {
  const height = ctx.canvas.height;
  const y =  height - height / 2;
  let step = 0;
  breakpoint.reduce((point, next, index) => {
    if (index % 2 !== 0) {
      ctx.beginPath();
      ctx.moveTo(point, height);
      ctx.lineTo(point, y+step);
      ctx.stroke();
      ctx.closePath();
    }
    step += 0.3
    return point + next;
  });
}

export default drawBreakpointTime;
