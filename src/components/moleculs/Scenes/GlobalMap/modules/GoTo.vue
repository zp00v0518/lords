<template>
  <div class="goto">
    <div class="goto__title">Перейти к</div>
    <div class="goto__content">
      <div class="goto__content__item">
        <label>
          X:
          <input type="text" value="0" />
        </label>
      </div>
      <div class="goto__content__item">
        <label>
          Y:
          <input type="text" value="0" />
        </label>
      </div>
    </div>
    <button class="goto__btn">Go</button>
  </div>
</template>

<script>
export default {
  name: 'GoTo'
};
</script>

<style lang="scss">
.goto {
  position: absolute;
  right: 10px;
  bottom: 0;
  transform: translateY(91%);
  display: flex;
  flex-direction: column;
  &__title{
    text-align: center;
  }
  &__content{
    display: flex;
    justify-content: space-around;
    &__item {
      display: flex;
      margin: 0 4px;
      input {
        max-width: 35px;
        height: 12px;
        font-weight: 12px;
      }
    }
  }
  &__btn{
    cursor: pointer;
    max-width: 50%;
    align-self: center;
    padding: 2px 10px;
    font-weight: bold;
  }
}
</style>
