function addBusyCaravan(caravan, payload) {
  Object.keys(payload).forEach(type => {
    const value = payload[type];
    if (caravan[type] !== undefined) {
      caravan[type] += value;
    }
  });
  return caravan;
}

module.exports = addBusyCaravan;
