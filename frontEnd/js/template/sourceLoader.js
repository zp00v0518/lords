var sourceLoader = {
  sources: {},
  sourceNum: 0,
  loadedNum: 0,
  //принимает:1) тип контента(js,img)
  //			2)scr  - путь к контенту;
  // необязательный параметр id;
  load: function(type, src, id) {
    sourceLoader.sourceNum++;
    var loaded = function(event) {
      sourceLoader.loadedNum++;
      //определяет % загруженных файлов и выводит это на экран
      var persent = Math.round(
        (100 / sourceLoader.sourceNum) * sourceLoader.loadedNum
      );
      var loadedBlock = document.getElementById('loadedBlock');
      loadedBlock.style.width = persent + '%';
    };
    if (type === 'img') {
      const img = new Image();
      img.onload = loaded;
      img.src = src;
      /* тут какая-то смешанная старая с новой логика 
      формирования объекта со всеми загруженными картинками */
      const newPath = src.replace('img\\', '');
      let d = newPath.split('/');
      if (d.length === 1) {
        d = newPath.split('\\');
      }
      if (!id) {
        let j = d[d.length - 1];
        let r = j.split('.');
        id = r[0];
      }
      const pathToObj = pathIntoObject(sourceLoader.sources, null, null, d);
      pathToObj[id] = img;
    } else if (type === 'js') {
      var script = document.createElement('script');
      var head = document.querySelector('head');
      script.src = src;
      head.appendChild(script);
      script.onload = loaded;
    }
  },
  allOnLoad: function(callback = function() {}) {
    if (sourceLoader.loadedNum === sourceLoader.sourceNum) {
      callback();
    } else {
      setTimeout(function() {
        sourceLoader.allOnLoad(callback);
      }, 50);
    }
  }
};

function pathIntoObject(obj, path, separator, separatorArr) {
  let q = [...separatorArr];
  if (!q) q = path.split(separator);
  q.length = q.length - 1;
  let result;
  recurcive(0, q, obj, itog => {
    result = itog;
  });

  return result;

  function recurcive(i, arr, obj, callback) {
    if (i < arr.length) {
      const nextKey = arr[i];
      let nextObj = obj[nextKey];
      if (!nextObj) {
        obj[nextKey] = {};
        nextObj = obj[nextKey];
      }
      i++;
      recurcive(i, arr, nextObj, callback);
    } else {
      callback(obj);
    }
  }
}
