import createBasicBuilding from '../../createBasicBuilding.js';
import schema from '../../../workWithMongoDB/schema.js';
const { document } = schema;
import workSection from '../workSection.js';

function createMarket({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.market, lvl);
  basic.work = workSection({ addValue });
  return basic;
}

export default createMarket;
