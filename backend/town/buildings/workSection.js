function workSection({ addValue = 0, flagStatic = true }) {
  if (flagStatic) {
    return {
      is: false,
      date: new Date(),
      static: true
    };
  } else {
    return {
      is: false,
      date: new Date(),
      bonus: 0,
      addValue,
      lastCalc: 0,
      nowValue: 0,
      static: false // признак того, что строение дает прирост чего-нибудь
    };
  }
}

export default workSection
