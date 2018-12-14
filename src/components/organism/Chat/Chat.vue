<template>
  <div class="chat" :class="{chat__closed: !showChat}" @transitionend="changeChatWindow">
    <div class="chat__header">
      <div @click="closeChat" class="chat__close">X</div>
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
      <textarea class="chat__form__message" @keyup.prevent.enter="sendMessage" v-model="messageForSend.text"></textarea>
    </form>
    <div class="chat__messages">
      <div class="chat__messages__item" :key="key" v-for="(message, key) in messages">
        <div class="chat__messages__item__time">{{timeFormatic(message.time)}} </div>
        <div class="chat__messages__item__author">{{message.author}} </div>
        <div class="chat__messages__item__text">{{message.text}} </div>
      </div>
    </div>
    <div v-if="showSmallChat" @click="closeChat" class="chat__show">Y</div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      showChat: true,
      showSmallChat: false,
      messageForSend:{
        text: "",
        chanel:"",
        privat:"",
      },
    };
  },
  created () {
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages;
    }
  },
  methods: {
    timeFormatic(time) {
      const date = new Date(time);
	    let minutes = date.getMinutes();
	    let hours = date.getHours();
      let seconds = date.getSeconds();
      minutes = (minutes <= 9) ? "0" + minutes : minutes;
      hours = (hours <= 9) ? "0" + hours : hours;
      seconds = (seconds <= 9) ? "0" + seconds : seconds;
      return hours+":"+minutes;
    },
    closeChat() {
      this.showChat = !this.showChat;
      this.$store.commit("closeChat");
    },
    changeChatWindow(event) {
      this.showSmallChat = !this.showSmallChat;
    },
    sendMessage(event) {
      console.log(this.$ws);
      this.$ws.sendMessage(this.messageForSend);
      this.messageForSend.text = ""
    }
  }
};
</script>

<style lang='scss' scoped>
@import "chat.scss";
</style>
