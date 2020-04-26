<template>
  <div class="hero-transfer">
    <div class="hero-transfer__title">
      <div
        class="hero-transfer__title--txt"
      >{{upperFirstSymbol(gloss.dialog.questions.heroTransfer.txt)}}</div>
      <Icon class="dialog__close" name="circle-close" @click.native="closeDialogWindow"></Icon>
    </div>
    <div>
      <div class="hero-transfer__footer__price--item">
        <div class="hero-transfer__footer__price__resource">
          <div class="text">{{ upperFirstSymbol(gloss.date.time.txt) }}</div>
          <div class="value">{{ timeText }}</div>
        </div>
      </div>
    </div>
    <div class="hero-transfer__footer__gui">
      <GuiBtn
        type="ok"
        class="hero-transfer__footer__gui--btn"
        @click="sendHero"
        :disabled="createDisabled"
      />
      <GuiBtn type="cancel" class="hero-transfer__footer__gui--btn" @click="closeDialogWindow" />
    </div>
  </div>
</template>

<script>
import { closeMixin } from '../../dialogMixin';
import { currentSector } from '../../../../mixins';
import { getAsTimeString } from '../../../../../utils';

export default {
  name: 'HeroTransferDialog',
  mixins: [closeMixin, currentSector],
  props: {
    data: { type: Object, required: true }
  },
  data() {
    return {
      timeText: ''
    };
  },
  computed: {
    activeHero() {
      const { activeHeroId, heroesList } = this.$store.state.heroes;
      return heroesList.find(i => i._id === activeHeroId);
    },
    heroInTown() {
      const { activeHero, data } = this;
      if (!activeHero) return false;
      const { initSector } = data;
      const { heroes } = initSector;
      return Array.isArray(heroes) && heroes.includes(activeHero._id);
    },
    createDisabled() {
      return !this.activeHero || !this.heroInTown;
    }
  },
  watch: {
    createDisabled: {
      immediate: true,
      handler(e) {
        this.setTimeText();
      }
    },
    activeHero: function() {
      this.setTimeText();
    }
  },
  methods: {
    getAsTimeString,
    sendHero() {
      const { activeHero, createDisabled, data, globalConfig, gloss } = this;
      if (createDisabled) return;
      const { targetTile } = data;
      const evTypes = globalConfig.all.Event.types;
      const message = {
        type: evTypes.heroTransfer,
        data: {
          heroId: activeHero._id,
          targetSector: targetTile._id
        },
        status: true
      };
      this.$ws.get(message).then(res => {
        console.log(res);
        const txt = gloss.eventLang.eventResult[res.type][res.status].txt;
        const message = {
          type: 'message',
          data: {
            txt
          }
        };
        this.$store.commit('DIALOG_SHOW', message);
      });
    },
    setTimeText() {
      const { createDisabled, gloss, upperFirstSymbol } = this;
      if (createDisabled) {
        this.timeText = upperFirstSymbol(gloss.dialog.chooseHero.txt);
        return;
      }
      const time = this.getMoveTime();
      const str = this.getAsTimeString(time);
      this.timeText = str;
    },
    getMoveTime() {
      const { WorldMap } = this.globalConfig.all;
      const { data, activeHero } = this;
      const { targetTile, initSector } = data;
      return WorldMap.getTimeMoveOnMap(initSector, targetTile, { hero: activeHero });
    }
  }
};
</script>

<style lang="scss">
.hero-transfer {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__title {
    display: flex;
    justify-content: flex-end;
    &--txt {
      flex-grow: 2;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding: 10px;
    }
  }
  &__body {
    height: 60%;
    flex-grow: 2;
  }
  &__tooltip {
    position: absolute;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    height: 30%;
    min-height: 100px;
    padding: 10px;
    &__price {
      margin-bottom: 10px;
      display: flex;
      &--item {
        width: 45%;
        margin: 10px;
        @include center;
      }
      &__resource {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
      }
    }
    &__gui {
      display: flex;
      justify-content: center;
      &--btn {
        margin: 15px 20px;
      }
    }
  }
}
</style>
