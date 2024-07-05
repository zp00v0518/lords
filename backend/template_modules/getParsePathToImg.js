//[TODO] по факту цей метод використовується лише на  фронті, тому від нього треба позбутися або перенести на фронт
import path from 'node:path';
import pathParse from 'path-parse';
import config from '../config/index.js'
const frontFolder = config.frontEnd.folder + '/';

function getParsePathToImg(pathToImg = '') {
  const newStr = pathToImg.replace(frontFolder, '');
  if (path.parse) {
    return path.parse(newStr);
  }
  return pathParse(newStr);
}

export default getParsePathToImg;
