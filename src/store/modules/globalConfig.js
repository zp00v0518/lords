import fromBackend from '../../fromBackend';

const globalConfig = {
  state: {
    races: fromBackend.Race
  }
};
console.log(globalConfig.state.races.rampart)
export default globalConfig;
