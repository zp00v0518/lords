<template>
  <section class="chat__wrap">
    <div
      v-show="showChat"
      class="chat"
      :class="{chat__closed: !showChat}"
    >
      <div class="chat__header">
        <div @click="closeChat" class="chat__close">x</div>
      </div>
      <form class="chat__form">
        <div class="chat__form__channel-wrap">
          <input type="text" class="chat__form__input">
          <select name id class="chat__form__select">
            <option value="1">Общий</option>
            <option value="1">Приватный</option>
            <option value="1">Торговый</option>
          </select>
        </div>
        <textarea
          class="chat__form__message"
          @keyup.prevent.enter="sendMessage"
          v-model="messageForSend.text"
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
    <ChatSmall v-if="!showChat"> </ChatSmall>
  </section>
</template>

<script>
import ChatSmall from './ChatSmall'
export default {
  name: "Chat",
  components: {
    ChatSmall,
  },
  data() {
    return {
      showChat: true,
      showSmallChat: false,
      messageForSend: {
        text: "",
        chanel: "",
        privat: ""
      }
    };
  },
  created() {
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages;
    }
  },
    watch: {
    "$store.state.chat.is": function() {
      this.showChat = !this.showChat;
    }
  },
  methods: {
    timeFormatic(time) {
      const date = new Date(time);
      let minutes = date.getMinutes();
      let hours = date.getHours();
      // let seconds = date.getSeconds();
      minutes = minutes <= 9 ? "0" + minutes : minutes;
      hours = hours <= 9 ? "0" + hours : hours;
      // seconds = seconds <= 9 ? "0" + seconds : seconds;
      return hours + ":" + minutes;
    },
    closeChat() {
      this.$store.commit("CHANGE_CHAT");
    },
    changeChatWindow(event) {
      this.showSmallChat = !this.showSmallChat;
    },
    sendMessage(event) {
      this.$ws.sendMessage(this.messageForSend);
      this.messageForSend.text = "";
    }
  }
};
</script>

<style lang='scss' scoped>
@import "chat.scss";
</style>
