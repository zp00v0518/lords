<template>
  <div class="dialog-battle">
    DialogBattle
    <div class="dialog-battle__confirm">
      <GuiBtn
        type="buy"
        class="dialog-battle__confirm--btn"
        @click="goBattle"
      />
      <GuiBtn
        type="cancel"
        class="dialog-battle__confirm--btn"
        @click="$emit('close')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogBattle",
  methods: {
    goBattle() {
      console.log("goBattle");
    }
  }
};
</script>

<style lang="scss"></style>
