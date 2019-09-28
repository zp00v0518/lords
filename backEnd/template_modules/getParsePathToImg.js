const path = require('path');
const frontFolder = require('../config').frontEnd.folder + '/';

function getParsePathToImg(pathToImg = '') {
  return path.parse(pathToImg.replace(frontFolder, ''));
}

module.exports = getParsePathToImg;
