function removeBusyCaravan(caravan, payload) {
  Object.keys(payload).forEach(type => {
    const value = payload[type];
    if (caravan[type] !== undefined) {
      caravan[type] -= value;
      caravan[type] = caravan[type] < 0 ? 0 : caravan[type];
    }
  });
  return caravan;
}

module.exports = removeBusyCaravan;
