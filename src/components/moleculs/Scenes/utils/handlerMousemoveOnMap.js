function handlerMousemoveOnGlobalMap(event) {
  this.mouseCoords = this.getCursorPositionOnScene(event);
  if (this.checkMouseCoordsOnMap()) {
    const rombIndex = this.getTileCoordsOnMap();
    const lineX = this.currentMap[rombIndex.x];
    if (lineX && lineX[rombIndex.y] && this.currentTile !== lineX[rombIndex.y]) {
      this.drawMap();
      this.currentTile = this.currentMap[rombIndex.x][rombIndex.y];
      if (this.customHoverFunc) {
        this.customHoverFunc(this.ctx, this.currentMap, this.tileWidth, this.currentTile);
      } else {
        this.drawHoverLine(rombIndex);
        this.showTooltip = true;
        this.ctx.canvas.style.cursor = 'pointer';
      }
    }
  } else {
    this.ctx.canvas.style.cursor = 'default';
    this.hideTooltip();
    this.drawMap();
    // if (this.customHoverFunc) {
    //   this.customHoverFunc(this.ctx, this.currentMap, this.tileWidth);
    // }
  }
}
export default handlerMousemoveOnGlobalMap;
