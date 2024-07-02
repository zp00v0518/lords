function calcValueInBuild({ build, timeEnd = new Date().getTime() }) {
  const work = build.work;
  work.is = true;
  work.date = new Date();
}

export default calcValueInBuild;
