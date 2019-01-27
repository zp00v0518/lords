function getTimeString(time) {
  const timeList = this.$var.time;
  let string = "";
  if (time >= timeList.day) {
    let days = getValuesDate(time, timeList.day);
    string = days + "д.";
    time = time - parseFloat(days) * timeList.day;
    string += getHours(time, timeList.hour);
  } else if (time < timeList.day && time >= timeList.hour) {
    string = getHours(time, timeList.hour);
  } else if (time < timeList.hour && time >= timeList.minute) {
    string = getMinutes(time, timeList.minute);
  } else if (time < timeList.minute && time >= timeList.sec) {
    string = getSeconds(time, timeList.sec);
  }

  return string;

  function getValuesDate(time, search) {
    return (time / search).toString().split(".")[0];
  }

  function getSeconds(time, search) {
    let string = "";
    let seconds = getValuesDate(time, search);
    return (string += seconds + "сек.");
  }

  function getMinutes(time, search) {
    let string = "";
    let minutes = getValuesDate(time, search);
    time = time - parseFloat(minutes) * search;
    string += minutes + "м.";
    string += getSeconds(time, timeList.sec);
    return string;
  }

  function getHours(time, search) {
    let string = "";
    let hours = getValuesDate(time, search);
    time = time - parseFloat(hours) * search;
    string += hours + "ч.";
    string += getMinutes(time, timeList.minute);
    return string;
  }
}

export default getTimeString;
