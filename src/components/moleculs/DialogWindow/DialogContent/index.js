import Message from './Message';
import Upgrade from './Upgrade';
import DialogBattle from './DialogBattle';
import WorldMapDialog from './WorldMapDialog';

export default {
  Message,
  DialogBattle,
  ...WorldMapDialog,
  ...Upgrade
};
