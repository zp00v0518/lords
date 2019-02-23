function drawBreakpointTime(ctx, breakpoint) {
  const height = ctx.canvas.height;
  breakpoint.reduce((point, next, index) => {
    console.log(index)
    if (index % 2 !== 0) {
      ctx.beginPath();
      ctx.moveTo(point, height);
      ctx.lineTo(point, height - height / 2);
      ctx.stroke();
      ctx.closePath();
    }
    return point + next;
  });
}

export default drawBreakpointTime;
