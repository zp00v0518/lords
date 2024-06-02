/* формируется список путей всех картинок, который расположены в папке frontend/img, 
потом этот список загружается через sourceLoader, для использования на canvas
*/
const fs = require('fs');
const path = require('path');
const startPath = 'img/for_canvas';
let arrPath = [];

function getPath(nextPath) {
  const f = fs.readdirSync(nextPath);
  f.forEach(item => {
    const checkPath = path.join(nextPath, item);
    const d = fs.statSync(checkPath);
    if (!d.isDirectory()) {
      arrPath.push(checkPath);
    } else {
      getPath(checkPath);
    }
  });
}
const normStr = 'frontEnd';

getPath('./frontEnd/' + startPath);
arrPath = arrPath.map(item => {
  return item.replace(normStr + path.sep, '');
});
fs.writeFileSync(
  './frontEnd/js/list_img_for_canvas.js',
  `const list_img_for_canvas = ${JSON.stringify(arrPath)}`,
  'utf-8'
);
