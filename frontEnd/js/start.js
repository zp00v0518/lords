list_img_for_canvas.forEach(item => {
  sourceLoader.load('img', item);
});

// sourceLoader.load("js", "dist/app.js");

sourceLoader.allOnLoad(function() {
  setTimeout(function() {
    var gameLoadingWrap = document.getElementById('gameLoadingWrap');
    var gameWindow = document.getElementById('app');
    const myEvent = new Event('allLoad');
    document.dispatchEvent(myEvent);
    gameLoadingWrap.style.display = 'none';
    gameWindow.style.display = 'flex';
  }, 100);
});
