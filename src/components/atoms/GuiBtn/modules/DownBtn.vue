<template>
  <img
    :src="computedImg"
    alt=""
    @mouseover="img = getImg($event)"
    @mouseleave="img = getImg($event)"
  />
</template>

<script>
import disabledImg from "../../../../../frontEnd/img/buttons/down/16/disabled.gif";
import upImg from "../../../../../frontEnd/img/buttons/down/16/up.gif";
import overImg from "../../../../../frontEnd/img/buttons/down/16/over.gif";
import mixin from "./mixin";

export default {
  name: "DownBtn",
  mixins: [mixin],
  data() {
    return {
      upImg,
      disabledImg,
      overImg
    };
  }
};
</script>
