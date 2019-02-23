function getCursorPositionOnScene(event) {
  const clientX = event.clientX;
  const clientY = event.clientY;
  const position = this.$el.getBoundingClientRect();
  const mouseX = Math.floor(clientX - position.left);
  const mouseY = Math.floor(clientY - position.top);
  return { x: mouseX, y: mouseY };
}

module.exports = getCursorPositionOnScene;
