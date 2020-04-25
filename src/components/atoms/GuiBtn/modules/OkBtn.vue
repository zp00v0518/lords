<template>
  <img
    :src="computedImg"
    alt
    @mouseover="img = getImg($event)"
    @mouseleave="img = getImg($event)"
    @mousedown="img = getImg($event)"
    @mouseup="img = getImg($event)"
  />
</template>

<script>
import upImg from '../../../../../frontEnd/img/buttons/ok/up.gif';
import disabledImg from '../../../../../frontEnd/img/buttons/ok/disabled.gif';
import overImg from '../../../../../frontEnd/img/buttons/ok/over.gif';
import downImg from '../../../../../frontEnd/img/buttons/ok/down.gif';
import mixin from './mixin';

export default {
  name: 'OkBtn',
  mixins: [mixin],
  props: {
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      upImg,
      disabledImg,
      overImg,
      downImg
    };
  }
};
</script>
