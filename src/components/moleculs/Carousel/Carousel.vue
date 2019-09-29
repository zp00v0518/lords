<template>
  <div class="carousel">
    <div class="carousel__content">
      <div
        :class="['carousel__item', {'carousel__item--active': active === index}]"
        v-for="(item, index) in data"
        :key="index"
      >
        <h3 class="carousel__item__title" v-if="item.title ">{{item.title }}</h3>
        <img :src="item.url" :alt="item.title || 'img'" />
      </div>
      <div
        v-if="data.length > 1"
        class="carousel__control carousel__control--left"
        @click="changeItem('left')"
      >></div>
      <div
        v-if="data.length > 1"
        class="carousel__control carousel__control--right"
        @click="changeItem('right')"
      >></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    data: { type: Array, default: () => [] },
    code: { type: String, default: "carousel" }
  },
  created() {
    console.log(this.data);
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    changeItem(way) {
      const { data } = this;
      let { active } = this;
      if (way === "right") {
        this.active = active === data.length - 1 ? 0 : ++active;
      }
      if (way === "left") {
        this.active = active === 0 ? data.length - 1 : --active;
      }
      this.$emit("carousel-change-item", {
        value: data[this.active],
        code: this.code
      });
    }
  }
};
</script>

<style lang="scss">
$margin-control: 5px;
.carousel {
  border: 1px solid;
  &__content {
    position: relative;
    height: 150px;
  }
  &__item {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: -1;
    opacity: 0;
    transition: 0.4s;
    &--active {
      z-index: 1;
      opacity: 1;
    }
    & img {
      width: 100px;
    }
    &__title {
      text-transform: capitalize;
    }
  }
  &__control {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: grey;
    color: white;
    position: absolute;
    top: 50%;
    @include center;
    font-size: 20px;
    cursor: pointer;
    z-index: 10;

    &--left {
      transform: translateY(-50%) rotate(180deg);
      left: $margin-control;
    }
    &--right {
      right: $margin-control;
      transform: translateY(-50%);
    }
  }
}
</style>