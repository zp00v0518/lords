import { getParsePathToImg } from '../../template_modules/index.js';
const basePath = 'frontEnd/img/for_canvas/heroes/rampart/';

const images = {
  kir: {
    ava: getParsePathToImg(basePath + 'kir.png'),
    ico: getParsePathToImg(basePath + 'small/kir.png')
  },
  klency: {
    ava: getParsePathToImg(basePath + 'klency.png'),
    ico: getParsePathToImg(basePath + 'small/klency.png')
  },
  elezar: {
    ava: getParsePathToImg(basePath + 'elezar.png'),
    ico: getParsePathToImg(basePath + 'small/elezar.png')
  }
};

export default images;
