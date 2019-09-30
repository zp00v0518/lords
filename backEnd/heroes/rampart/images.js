const { getParsePathToImg } = require('../../template_modules');

const images = {
  kir: {
    ava: getParsePathToImg('frontEnd/img/for_canvas/heroes/rampart/kir.png'),
    ico: getParsePathToImg(
      'frontEnd/img/for_canvas/heroes/rampart/small/kir.png'
    )
  },
  klency: {
    ava: getParsePathToImg('frontEnd/img/for_canvas/heroes/rampart/klency.png'),
    ico: getParsePathToImg(
      'frontEnd/img/for_canvas/heroes/rampart/small/klency.png'
    )
  },
  elezar: {
    ava: getParsePathToImg('frontEnd/img/for_canvas/heroes/rampart/elezar.png'),
    ico: getParsePathToImg(
      'frontEnd/img/for_canvas/heroes/rampart/small/elezar.png'
    )
  }
};

module.exports = images;
