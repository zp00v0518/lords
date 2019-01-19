function handlerMousemoveOnGlobalMap(event) {
  this.mouseCoords = this.getCursorPositionOnScene(event);
  if (this.checkMouseCoordsOnMap()) {
    const rombIndex = this.getTileCoordsOnMap();
    if (this.currentTile !== this.currentMap[rombIndex.x][rombIndex.y]) {
      this.drawMap();
      this.drawHoverLine(rombIndex);
      this.currentTile = this.currentMap[rombIndex.x][rombIndex.y];
      this.showTooltip = true;
    }
  } else {
    this.hideTooltip();
  }
}
export default handlerMousemoveOnGlobalMap;
