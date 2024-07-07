<template>
  <div class="guibtn">
    <component
      :is="type + 'Btn'"
      :disabled="disabled"
      @click="handlerClick"
      class="guibtn--item"
    ></component>
  </div>
</template>

<script>
import modules from './modules/index.js'

export default {
  name: 'GuiBtn',
  components: { ...modules },
  emits: ['click'],
  props: {
    type: { type: String, default: 'cancel' },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    handlerClick(event) {
      if (this.disabled) return
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss">
.guibtn {
  cursor: pointer;
  &--item {
    width: 100%;
  }
}
</style>
