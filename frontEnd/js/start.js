console.log("start");
sourceLoader.load("js", "dist/app.js");

sourceLoader.allOnLoad(function(){
  var gameLoadingWrap = document.getElementById("gameLoadingWrap");
  // var gameWindow = document.getElementById("app");
  setTimeout(function(){
    gameLoadingWrap.style.display = "none";
    // gameWindow.style.display = "flex";
  },100)
  console.log(sourceLoader)
});