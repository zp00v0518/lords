const fs = require('fs');
const Log = require('template_func').Log;
const log = new Log(__dirname);

function watchFs(pathWatch, callback) {
  const watcher = fs.watch(
    pathWatch,
    { recursive: true },
    (eventType, filename) => {
      watcher.close();
      // console.log(`Тип события: ${eventType}`);
      if (filename) {
        // console.log(filename);
      } else {
        log.log('Имя файла отсутствует');
      }
      callback();
    }
  );
}

module.exports = watchFs;
