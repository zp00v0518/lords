<template>
  <div class="choices-race">
    <h3 class="choices-race__title">Выберите расу и героя</h3>
    <div class="choices-race__content">
      <Carousel class="choices-race__item" :data="listRaces" :code="'race'" />
      <Carousel
        class="choices-race__item"
        :data="listHeroes"
        @carousel-change-item="handlerChangeItem"
        :code="'heroes'"
      />
    </div>
    <button
      class="choices-race__btn"
      type="button"
      @click="sendChoiceToServer"
    >Я сделал выбор. Давай уже, не томи</button>
  </div>
</template>

<script>
import Carousel from "../../moleculs/Carousel";

export default {
  name: "ChoicesRace",
  components: {
    Carousel
  },
  data() {
    return {
      listRaces: [],
      listHeroes: [],
      itogMessage: {
        type: "choicesRace",
        url: location.pathname
      }
    };
  },
  created() {
    this.createListRaces();
    this.createListHeroes("rampart");
  },
  methods: {
    createListRaces() {
      const races = this.globalConfig.races;
      const result = races.getRace().map(item => {
        const template = {
          type: item.type,
          url: `${item.images.ico.dir}/${item.images.ico.base}`,
          title: item.type
        };
        return template;
      });
      this.listRaces = result;
      this.itogMessage.race = this.listRaces[0].type;
    },
    createListHeroes(type_race) {
      const races = this.globalConfig.races;
      const heroes = races.heroes.getHeroes(type_race);
      const result = heroes.map(item => {
        item.url = `${item.img.ava.dir}/${item.img.ava.base}`;
        item.title = item.name;
        return item;
      });
      this.listHeroes = result;
      this.itogMessage.heroes = this.listHeroes[0].type;
    },
    handlerChangeItem(event) {
      const { itogMessage } = this;
      const { code, value } = event;
      itogMessage[code] = value.type;
    },
    sendChoiceToServer() {
      this.$ws.sendMessage(this.itogMessage);
    }
  }
};
</script>

<style lang="scss">
.choices-race {
  align-self: center;
  margin-top: 100px;
  &__title {
    text-align: center;
    margin-bottom: 20px;
  }
  &__content {
    display: flex;
    flex-direction: column;
  }

  &__item {
    height: 50%;
    width: 100%;
  }
  &__btn {
    margin-top: 10px;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
