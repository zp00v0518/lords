<template>
  <div class="okCancelBlock">
    <GuiBtn
      type="ok"
      class="okCancelBlock__item"
      @click="$emit('ok', {value: $event})"
      :disabled="isDisabled"
    />
    <GuiBtn type="cancel" class="okCancelBlock__item" @click="$emit('cancel', {value: $event})" />
  </div>
</template>

<script>
export default {
  name: 'OkCancelBlock',
  props: {
    disabled: { type: Boolean, default: true }
  },
  data() {
    return {
      isDisabled: this.disabled
    };
  },
  watch: {
    disabled: function(value) {
      this.isDisabled = value;
    }
  }
};
</script>

<style lang="scss">
.okCancelBlock {
  @include center;
  &__item {
    margin: 12px;
  }
}
</style>
