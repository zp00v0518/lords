<template>
  <div class="hero-inactive">
    <div v-for="hero in heroesList" :key="hero._id" class="hero-inactive__item">
      <div class="hero-inactive__item__ava">
        <img :src="getHeroesAvatar(hero)" />
        <div class="hero-inactive__item__tooltip">{{hero.event && hero.event.type}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InActiveHeroes',
  props: {
    heroesList: { type: Array, default: () => [] }
  },
  data() {
    return {
      eventsList: []
    };
  },
  watch: {
    '$store.state.timeline.eventsList': {
      immediate: true,
      handler(list) {
        const { deepClone } = this;
        const arr = list.filter(i => i.data.initHero);
        this.eventsList = deepClone(arr);
        this.addEventOnHero();
      }
    }
  },
  methods: {
    getHeroesAvatar(hero) {
      if (!hero) return;
      const { races } = this.globalConfig;
      return races.heroes.getHeroImg(hero.race, hero.type);
    },
    addEventOnHero() {
      const { eventsList, heroesList } = this;
      heroesList.forEach(hero => {
        const { _id } = hero;
        const event = eventsList.find(ev => ev.data.initHero === _id);
        if (event) {
          hero.event = event;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.hero-inactive {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  &__item {
    cursor: pointer;
    margin-right: 5px;
    position: relative;
    &:hover {
      .hero-inactive__item__tooltip {
        display: block;
      }
    }
    &__tooltip {
      display: none;
      position: absolute;
      padding: 10px;
      background-color: $popup-bg;
      top: 0;
      transform: translateY(-50%) translateX(-50%);
      border-radius: 5px;
    }
  }
}
</style>
