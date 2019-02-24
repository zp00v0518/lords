function getPositionEvent(now, time) {
  const difTime = getDifferrentTime(now, time);
  if (!difTime) return;
  const widthHour = this.breakpoint[difTime.hour + 1];
  const widthMinute = widthHour / 60;
  const mediumArr = [...this.breakpoint];
  mediumArr.length = difTime.hour;
  const position = mediumArr.reduce((sum, current) => {
    return sum + current;
  }, difTime.minute * widthMinute);
  return position;
}

export default getPositionEvent;

function getDifferrentTime(now, time) {
  const minute = 1000 * 60;
  const difTime = time - now;
  const difMinute = difTime / minute;
  const hour = difMinute / 60;
  const result = {
    hour: +hour.toString()[0],
    minute: difMinute % 60
  };
  if (!result.hour || !result.minute) return false;
  return result;
}
