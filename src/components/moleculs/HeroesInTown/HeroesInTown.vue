<template>
  <div class="heroes-in-town">
    <div
      v-for="(hero, index) in heroesList"
      :key="index"
      class="heroes-in-town__item"
    >
      <div class="heroes-in-town__item--img">
        <img :src="getHeroesAvatar(hero)" alt="heroavatar" />
      </div>
      <div class="heroes-in-town__item__control">control</div>
      <div class="heroes-in-town__item__content">
        <div class="heroes-in-town__item__content__info">
          <div class="heroes-in-town__item__content__info--name">
            {{ hero.name }}
          </div>
          <div class="heroes-in-town__item__content__info--lvl">
            lvl: {{ hero.lvl }}
          </div>
        </div>
        <ArmyLine />
      </div>
    </div>
  </div>
</template>

<script>
import ArmyLine from "../ArmyLine";

export default {
  name: "HeroesInTown",
  components: { ArmyLine },
  props: {
    heroesList: { type: Array, default: () => [] }
  },
  methods: {
    getHeroesAvatar(hero) {
      const { races } = this.globalConfig;
      return races.heroes.getHeroImg(hero.race, hero.type);
    }
  }
};
</script>
<style lang="scss">
.heroes-in-town {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 100%;
  &__item {
    display: flex;
    &--img {
      flex-basis: 20%;
      padding: 3px;
      & > img {
        width: 100%;
      }
    }
    &__control {
      display: flex;
      flex-direction: column;
      width: 15px;
      overflow: hidden;
      writing-mode: vertical-rl;
    }
    &__content {
      display: flex;
      flex-direction: column;
      width: 60%;
      &__info {
        display: flex;
        padding: 3px;
        &--name {
          font-size: 16px;
          font-weight: bold;
          margin-right: 10px;
          @media (min-width: $tablet) {
            font-size: 14px;
          }
        }
        &--lvl {
          font-size: 14px;
          @media (min-width: $tablet) {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
