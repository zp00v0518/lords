<template>
  <section class="hall__wrap">
    <div class="hall__row" v-for=" row in 5" :key="row">
      <div v-for="index in rowsIndex[row-1]" :key="index" class="hall__row__item">
        <div class="hall__row__item-icon"></div>
        <div class="hall__row__item-footer"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Hall",
  data() {
    return {
      rowsIndex: [4, 3, 3, 4, 3]
    };
  },

  methods: {}
};
</script>

<style lang='scss' scoped>
.hall {
  &__wrap {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 10;
  }
  &__row {
    display: flex;
    justify-content: center;
    height: 25%;
    padding: 1% 0;
    &__item {
      margin: 0 3%;
      width: 20%;
      min-width: 17%;
      border: 1px solid white;
      display: flex;
      flex-direction: column;
      &-icon{
        height: 80%;
        border: 1px solid green;
        background-image: url('../../../../../../frontEnd/img/towns/rampart/ramparttiles.jpg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position-x: 0px;
        background-position-y: 0px;
      }
      &-footer{
        height: 20%;
        min-height: 30px;
      }
    }
  }
}
</style>
