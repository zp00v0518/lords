import Message from './Message';
import Upgrade from './Upgrade';
import DialogBattle from './DialogBattle';
import WorldMapDialog from './WorldMapDialog';
import AttackEnemyRegion from './AttackEnemyRegion';

export default {
  Message,
  DialogBattle,
  AttackEnemyRegion,
  ...WorldMapDialog,
  ...Upgrade
};
