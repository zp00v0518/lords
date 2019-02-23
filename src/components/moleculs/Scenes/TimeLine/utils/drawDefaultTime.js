function drawDefaultTime(ctx, breakpoint) {
  const defaultPoint = [0, 6, 12, 24];
  const y = ctx.canvas.height / 2;
  const hour = 1000 * 60 * 60;
  const now = new Date().getTime();
  breakpoint.reduce((x, next, index) => {
    if (defaultPoint.includes(index-1)) {
      const timeTxt = getTimeTxt(now + hour * (index-1));
      const textWidth = ctx.measureText(timeTxt).width;
      ctx.strokeText(timeTxt, x - textWidth / 2, y);
    }
    return x + next;
  });
}

export default drawDefaultTime;

function getTimeTxt(time) {
  const date = new Date(time);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hour + ':' + minutes;
}
