list_img_for_canvas.forEach(item => {
  sourceLoader.load("img", item);
})

// sourceLoader.load("js", "dist/app.js");

sourceLoader.allOnLoad(function(){
  var gameLoadingWrap = document.getElementById("gameLoadingWrap");
  var gameWindow = document.getElementById("app");
  setTimeout(function(){
    const myEvent = new Event('allLoad');
    document.dispatchEvent(myEvent);
    gameLoadingWrap.style.display = "none";
    gameWindow.style.display = "flex";
    // console.log(sourceLoader)
  },100)
});

