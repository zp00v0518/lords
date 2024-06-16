<template>
  <section v-if="$store.state.dialog.show || show" class="dialog__wrap">
    <div class="dialog" :style="{height, width}">
      <div class="dialog__header" v-if="title">
        <div class="dialog__title">{{title}}</div>
        <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
      </div>
      <slot>
        <components
          @set-height="setHeight"
          :is="typeDialog[$store.state.dialog.type]"
          :data="$store.state.dialog.data"
          @close="closeDialogWindow()"
        ></components>
      </slot>
    </div>
  </section>
</template>

<script>
import DialogContent from './DialogContent';
import Market from '../Scenes/TownMap/Buildings/Market';
import { closeMixin } from './dialogMixin';

const typeDialog = {
  upgradeRegion: 'UpgradeRegion',
  upgradeBuilding: 'UpgradeBuilding',
  message: 'Message',
  dialogBattle: 'DialogBattle',
  worldMapRegion: 'WorldMapRegion',
  heroTransferDialog: 'HeroTransferDialog',
  sendCaravan: 'Market',
  attackEnemyRegion: 'AttackEnemyRegion'
};

export default {
  name: 'DialogWindow',
  mixins: [closeMixin],
  props: {
    show: { type: Boolean, default: false },
    headerTitle: { type: String, default: '' }
  },
  components: { ...DialogContent, Market },
  data() {
    return {
      height: '90%',
      width: '90%',
      typeDialog
    };
  },
  computed: {
    title() {
      return this.headerTitle || this.$store.state.dialog.title;
    }
  },
  methods: {
    setHeight(e) {
      this.height = e.height;
      this.width = e.width;
    }
  }
};
</script>

<style lang='scss'>
@import 'dialog_window.scss';
</style>
