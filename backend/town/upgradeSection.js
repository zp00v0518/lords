// стандартная секция строения, которая содержит инфо про улучшения
function UpgradeSection() {
  return {
    is: false, // ||true  находться ли шахта в процессе улучшения
    date: 0, // время изменения is
    bonus: 0
  };
}

module.exports = UpgradeSection;
