<template>
  <div>
    <div class="hero-transfer__title">
      <div
        class="hero-transfer__title--txt"
      >{{upperFirstSymbol(gloss.popup.sendСaravan.title.txt)}}</div>
      <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
    </div>
  </div>
</template>

<script>
import { closeMixin } from '../../dialogMixin';

export default {
  name: 'SendCaravanDialog',
  mixins: [closeMixin]
};
</script>

<style lang="scss">
</style>
