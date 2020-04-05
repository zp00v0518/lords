<template>
  <div class="worldmap-region">
    <div class="worldmap-region__title">
      <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
    </div>
  </div>
</template>

<script>
import { closeMixin } from '../../dialogMixin';

export default {
  name: 'WorldMapRegion',
  mixins: [closeMixin],
  props: {
    data: { type: Object, required: true }
	},
	created(){
		console.log(this.data)
	}
};
</script>

<style lang="scss">
.worldmap-region {
  &__title {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
