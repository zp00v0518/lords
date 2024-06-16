import Message from './Message/index.js';
import Upgrade from './Upgrade/index.js';
import DialogBattle from './DialogBattle/index.js';
import WorldMapDialog from './WorldMapDialog/index.js';
import AttackEnemyRegion from './AttackEnemyRegion/index.js';

export default {
  Message,
  DialogBattle,
  AttackEnemyRegion,
  ...WorldMapDialog,
  ...Upgrade
};
