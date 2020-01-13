<template>
  <img :src="img" alt="" @mouseover="img = overImg" @mouseleave="img = upImg"/>
</template>

<script>
import upImg from "../../../../../frontEnd/img/buttons/cancel/up.gif";
import overImg from "../../../../../frontEnd/img/buttons/cancel/over.gif";

export default {
  name: "CancelBtn",
  props: {
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      img: upImg,
      overImg,
      upImg
    };
  }
};
</script>
