const ev = require('../../events/Event');
const evTypes = ev.types;

const eventLang = {
  eventResult: {
    [evTypes.buildNewTown]: {
      true: {
        ru: 'Герой отправился строить новый город'
      },
      false: {
        ru: 'Что-то пошло не так. Повторите попытку позже'
      }
    },
    [evTypes.heroTransfer]: {
      true: {
        ru: 'Герой отправился в путь'
      },
      false: {
        ru: 'Что-то пошло не так. Повторите попытку позже'
      }
    }
  }
};

module.exports = eventLang;
