function memory() {
  let d = performance.memory.totalJSHeapSize;
  window.getChangesMemory = getChangesMemory;
  setInterval(() => {
    const a = performance.memory.totalJSHeapSize;
    const z = Math.round((a - d) / (1024 * 8));
    console.log(`${z} Кбайт  на ${window.stateCount} запросов`);
    d = a;
  }, 30000);
}
const start = performance.memory.totalJSHeapSize;
const startTime = Date.now();

function getChangesMemory() {
  const a = performance.memory.totalJSHeapSize;
  const z = Math.round((a - start) / (1024 * 8));
  const now = Date.now();
  console.log(`${z} Кбайт  за ${(now - startTime) / 60000} мин`);
}

export default memory;
