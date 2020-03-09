const { Army } = require('../army');

function getForceStackWithHero(stack, hero) {
  const force = Army.getForceStack(stack);
  return force;
}

module.exports = getForceStackWithHero;
