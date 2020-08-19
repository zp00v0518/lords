const user_1 = {
  id: 1,
  pass: 'test',
  email: 'admin@gmail.com',
  nickName: 'admin'
};

const collections = { server_1: { name: 'server_1', race: 0, alians: {}, rate: {}, color: '#FFE4E1' } };
const town = {
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
    upgrade: { is: false, date: 1597860029534, bonus: 0 },
    lvl: 1,
    class: 'barraks',
    parent: 'town',
    type: 'barraks_1',
    work: {
      is: true,
      date: '2020-08-19T17:53:45.774Z',
      bonus: 0,
      addValue: 12,
      lastCalc: 1597863338522,
      nowValue: 9.177588888888893,
      static: false
    },
    nextLvl: 1
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
      lastCalc: 1597863338522,
      nowValue: 7.6479768518518485,
      static: false
    },
    nextLvl: 1
  }
};
module.exports = { user_1, collections, town };
