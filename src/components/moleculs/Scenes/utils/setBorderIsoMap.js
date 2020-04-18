function setBorderIsoMap() {
  const currentLength = this.currentMap.length;
  const { borderIsoMap, isoCoords, tileWidth, viewportPath } = this;
  const height = tileWidth / 2;
  borderIsoMap.left.x = isoCoords.x;
  borderIsoMap.left.y = isoCoords.y;
  borderIsoMap.top.x = borderIsoMap.left.x + (tileWidth * currentLength) / 2;
  borderIsoMap.top.y = borderIsoMap.left.y - (height * currentLength) / 2;
  borderIsoMap.right.x = borderIsoMap.left.x + tileWidth * currentLength;
  borderIsoMap.right.y = borderIsoMap.left.y;
  borderIsoMap.bottom.x = borderIsoMap.top.x;
  borderIsoMap.bottom.y = borderIsoMap.left.y + (height * currentLength) / 2;
  viewportPath.moveTo(borderIsoMap.left.x, borderIsoMap.left.y);
  viewportPath.lineTo(borderIsoMap.top.x, borderIsoMap.top.y);
  viewportPath.lineTo(borderIsoMap.right.x, borderIsoMap.right.y);
  viewportPath.lineTo(borderIsoMap.bottom.x, borderIsoMap.bottom.y);
}

export default setBorderIsoMap;
