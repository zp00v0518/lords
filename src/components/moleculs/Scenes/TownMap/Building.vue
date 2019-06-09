<template>
  <section class="building__wrap">
    <div class="building__header">
      <div class="building__header-title">{{name}}</div>
      <Icon class="building__header-close" name="circle-close" @click.native="closeBuilding"></Icon>
    </div>
    <component :is="name" :raceName="raceName"></component>
  </section>
</template>

<script>
import Buildings from "./Buildings";

export default {
  name: "Building",
  props: {
    name: String,
    raceName: String
  },
  components: {
    ...Buildings
  },
  data() {
    return {};
  },

  methods: {
    closeBuilding() {
      this.$emit("close");
    }
  }
};
</script>

<style lang='scss' scoped>
.building {
  &__wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    // background-color: rgba(255, 255, 255, 1);
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1000;
  }
  &__header {
    display: flex;
    justify-content: flex-end;
    &-title {
      flex-grow: 10;
      @include center;
      text-transform: capitalize;
    }
    &-close {
      width: 20px;
      color: red;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
