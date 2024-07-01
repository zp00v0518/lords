const fs = require('fs');

function watchFs(pathWatch, callback) {
  const watcher = fs.watch(
    pathWatch,
    { recursive: true },
    (eventType, filename) => {
      watcher.close();
      if (filename) {
      } else {
        console.log('Имя файла отсутствует');
      }
      callback(filename);
    }
  );
}

module.exports = watchFs;
