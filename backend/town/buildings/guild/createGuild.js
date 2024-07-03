import createBasicBuilding from '../../createBasicBuilding.js';
import schema from '../../../workWithMongoDB/schema.js';
const { document } = schema;
import workSection from '../workSection.js';

function createGuild({ lvl = 0, addValue = 0 }) {
  const basic = createBasicBuilding(document.class.guild, lvl);
  basic.work = workSection({ addValue });
  return basic;
}

export default createGuild;
