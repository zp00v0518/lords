function formBreakpoint(result, width) {
  if (!width) return;
  const segments = 24;
  const startWidth = (width / 100) * 15;
  const step = 0.9;
  result = [];
  result.push(startWidth);
  let sum = 99999; // аккумулятор общей длины всех отрезков

  function formArr(arr, count, step) {
    for (let i = 0; i < count; i++) {
      const item = arr[arr.length - 1];
      const f = item * step;
      arr.push(f);
    }
    return arr;
  }
  result = formArr(result, segments - 1, step);

  while (Math.floor(sum) > width) {
    const d = result.reduce((sum, index) => sum + index) - width;
    let between = [d / segments];
    between = formArr(between, segments - 1, step);
    result = result.map((item, index) => {
      return item - between[index];
    });
    sum = result.reduce((sum, index) => sum + index);
  }
  return result;
}

export default formBreakpoint;
