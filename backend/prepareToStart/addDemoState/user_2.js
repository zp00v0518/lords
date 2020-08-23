const user_2 = {
  id: 3,
  pass: 'test',
  email: 'admin1@gmail.com',
  nickName: 'admin1'
};

const collections = { server_1: { name: 'server_1', race: 0, alians: {}, rate: {}, color: '#FFFFFF' } };
const town = {
  army: {
    def: false,
    units: [
      { race: 'rampart', name: 'kentavr_2', lvl: 1, count: 22, up: 1 },
      { race: 'rampart', name: 'gnom', lvl: 2, count: 33, up: 0 }
    ]
  },
  market: {
    upgrade: { is: false, date: 0, bonus: 0 },
    lvl: 1,
    class: 'market',
    parent: 'town',
    type: 'market',
    work: { is: true, date: '2020-08-19T17:53:45.774Z', static: true },
    nextLvl: 1
  },
  barraks_1: {
    upgrade: { is: false, date: 1598119535054, bonus: 0 },
    lvl: 2,
    class: 'barraks',
    parent: 'town',
    type: 'barraks_1',
    work: {
      is: true,
      date: '2020-08-19T17:53:45.774Z',
      bonus: 0,
      addValue: 12,
      lastCalc: 1598120134539,
      nowValue: 700.4998583333339,
      static: false
    },
    nextLvl: 2
  },
  barraks_2: {
    upgrade: { is: false, date: 1597860032618, bonus: 0 },
    lvl: 1,
    class: 'barraks',
    parent: 'town',
    type: 'barraks_2',
    work: {
      is: true,
      date: '2020-08-19T17:53:45.774Z',
      bonus: 0,
      addValue: 10,
      lastCalc: 1598120134539,
      nowValue: 569.0832013888893,
      static: false
    },
    nextLvl: 1
  },
  barraks_3: {
    upgrade: { is: false, date: 1598119554016, bonus: 0 },
    lvl: 1,
    class: 'barraks',
    parent: 'town',
    type: 'barraks_3',
    work: {
      is: true,
      date: '2020-08-22T18:02:03.062Z',
      bonus: 0,
      addValue: 8,
      lastCalc: 1598120134539,
      nowValue: 1.0680314814814813,
      static: false
    },
    nextLvl: 1
  },
  barraks_4: {
    upgrade: { is: false, date: 1598119631419, bonus: 0 },
    lvl: 1,
    class: 'barraks',
    parent: 'town',
    type: 'barraks_4',
    work: {
      is: true,
      date: '2020-08-22T18:02:03.062Z',
      bonus: 0,
      addValue: 6,
      lastCalc: 1598120134539,
      nowValue: 0.6925083333333334,
      static: false
    },
    nextLvl: 1
  }
};

module.exports = { user_2, collections, town };
