function checkUpgrade(building) {
  const now = new Date().getTime();
  const upgradeTime = building.upgrade.date;
  if (now > upgradeTime) {
    building.upgrade.is = false;
    building.upgrade.date = 0;
  }
};

module.exports = checkUpgrade;