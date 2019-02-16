
function formListUpgrade(sector) {
  const region = sector.region;
  sector.listUpgrade = [];
  for (let i = 0; i < region.length; i++) {
    let row = region[i];
    for (let h = 0; h < row.length; h++) {
      const cell = row[h];
      if (cell.sector && cell.sector.upgrade.is){
        sector.listUpgrade.push(row[h]);
      }
    }
  }
  return sector;
}

module.exports = formListUpgrade;
