const { getParsePathToImg } = require('../../template_modules');

const images = {
  bg: getParsePathToImg('frontEnd/img/for_canvas/towns/rampart/rampart.jpg'),
  ico: getParsePathToImg(
    'frontEnd/img/for_canvas/towns/rampart/ico/rampart.png'
  )
};

module.exports = images;
