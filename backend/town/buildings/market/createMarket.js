import createBasicBuilding from '../../createBasicBuilding.js';
import { document } from '../../../workWithMongoDB/schema.js';
import workSection from '../workSection.js';

function createMarket({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.market, lvl);
  basic.work = workSection({ addValue });
  return basic;
}

export default createMarket;
