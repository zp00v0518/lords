<template>
  <section class="chat__wrap" :style="chatStyles" :class="{'chat__wrap--visible': showChat}">
    <div v-show="showChat" class="chat" :class="{chat__closed: !showChat}">
      <div class="chat__header">
        <div @click="closeChat" class="chat__close">x</div>
      </div>
      <form class="chat__form">
        <div class="chat__form__channel-wrap">
          <input type="text" class="chat__form__input" />
          <select name id class="chat__form__select">
            <option :value="item.value" v-for="(item, index) in items" :key="index" class="chat__form__select__option">{{item.title}}</option>
          </select>
        </div>
        <textarea
          class="chat__form__message"
          @keyup.prevent.enter="sendMessage"
          v-model="messageForSend.text"
          rows="5"
        ></textarea>
      </form>
      <div class="chat__messages">
        <div class="chat__messages__item" :key="key" v-for="(message, key) in messages">
          <div class="chat__messages__item__time">{{timeFormatic(message.time)}}</div>
          <div class="chat__messages__item__author">{{message.author}}</div>
          <div class="chat__messages__item__text">{{message.text}}</div>
        </div>
      </div>
    </div>
    <!-- <ChatSmall v-if="!showChat" :isFullpage="isFullpage"></ChatSmall> -->
  </section>
</template>

<script>
import ChatSmall from './ChatSmall';
export default {
  name: 'Chat',
  components: { ChatSmall },
  props: {
    isFullpage: { type: Boolean, default: false }
  },
  data() {
    return {
      showChat: false,
      messageForSend: {
        text: '',
        chanel: '',
        privat: ''
      },
      items: [{ value: 1, title: 'Общий' }, { value: 1, title: 'Торговый' }, { value: 1, title: 'Приватный' }]
    };
  },
  created() {},
  computed: {
    messages() {
      return this.$store.state.chat.messages;
    },
    chatStyles() {
      const { isFullpage } = this;
      if (isFullpage) {
        return {
          transform: 'translateX(-100%)'
        };
      }
    }
  },
  watch: {
    '$store.state.chat.is': function() {
      this.showChat = !this.showChat;
    }
  },
  methods: {
    timeFormatic(time) {
      const date = new Date(time);
      let minutes = date.getMinutes();
      let hours = date.getHours();
      minutes = minutes <= 9 ? '0' + minutes : minutes;
      hours = hours <= 9 ? '0' + hours : hours;
      return hours + ':' + minutes;
    },
    closeChat() {
      this.$store.commit('CHANGE_CHAT');
    },
    sendMessage(event) {
      this.$ws.sendChatMessage(this.messageForSend);
      this.messageForSend.text = '';
    }
  }
};
</script>
