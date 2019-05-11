function getPositionEvent(now, time, maxWidth) {
  const difTime = getDifferrentTime(now, time);
  if (!difTime) return;
  difTime.hour =
    difTime.hour >= this.breakpoint.length - 2
      ? this.breakpoint.length - 2
      : difTime.hour;
  const widthHour = this.breakpoint[difTime.hour + 1];
  const widthMinute = widthHour / 60;
  const mediumArr = [...this.breakpoint];
  mediumArr.length = difTime.hour + 1;
  let position = mediumArr.reduce((sum, current) => {
    return sum + current;
  }, difTime.minute * widthMinute);
  // if (maxWidth) {
  //   position = position >= maxWidth ? maxWidth : position;
  // }
  return position;
}

export default getPositionEvent;

function getDifferrentTime(now, time) {
  const minute = 1000 * 60;
  const difTime = time - now;
  const difMinute = difTime / minute;
  const hour = difMinute / 60;
  const result = {
    hour: +hour.toFixed(0),
    minute: difMinute % 60
  };
  if (Number.isNaN(result.hour) || result.minute < 0) return false;
  return result;
}
