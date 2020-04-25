<template>
  <section v-if="$store.state.dialog.show" class="dialog__wrap">
    <div class="dialog" :style="{height, width}">
      <div class="dialog__header" v-if="title">
        <div class="dialog__title">{{title}}</div>
        <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
      </div>
      <components
        @set-height="setHeight"
        :is="$store.state.dialog.component"
        :data="$store.state.dialog.data"
        @close="closeDialogWindow()"
      ></components>
    </div>
  </section>
</template>

<script>
import DialogContent from './DialogContent';
import { closeMixin } from './dialogMixin';

export default {
  name: 'DialogWindow',
  mixins: [closeMixin],
  props: [],
  components: { ...DialogContent },
  data() {
    return {
      height: '90%',
      width: '90%'
    };
  },
  computed: {
    title() {
      return this.$store.state.dialog.title;
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
