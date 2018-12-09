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
      <textarea class="chat__form__message"></textarea>
    </form>
    <div class="chat__messages">
      <div class="chat__messages__item" :key="key" v-for="(message, key) in messages">
        <div class="chat__messages__item__time">{{message.time}} </div>
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
      messages: [
        {
          type: 0,
          time: "10:20",
          text: "jsdj kas kh ALSK DHKLJHKHSADFH JLL  DLFKJ VDF  dfvi",
          author: "Admin"
        },
        {
          type: 0,
          time: "10:21",
          text: "Lorem dgf f asjjsd   a adc",
          author: "Admin"
        }
      ]
    };
  },
  methods: {
    closeChat() {
      this.showChat = !this.showChat;
      this.$store.commit("closeChat");
    },
    changeChatWindow(event) {
      this.showSmallChat = !this.showSmallChat;
    }
  }
};
</script>

<style lang='scss' scoped>
@import "chat.scss";
</style>
