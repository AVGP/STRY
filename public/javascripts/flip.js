/*
console.log = function(msg) {
    document.getElementById("console").innerHTML += "<p>" + msg + "<p>";
}
*/
var gestures = {};
var SWIPE_THRESHOLD = 50;

var flipForward = function() {
  var currentPage = document.querySelector(".current");
  
  if(!currentPage) return;
  
  currentPage.classList.toggle("current");
  currentPage.classList.toggle("flipped");
  currentPage.classList.remove("prev");
  
  var prevChild = currentPage.previousSibling;
  do {
    if(prevChild.nodeType == document.ELEMENT_NODE) {
      prevChild.classList.add("current");
      break;
    }
  } while(prevChild = prevChild.previousSibling);
};

var flipBack = function() {
  var currentPage  = document.querySelector(".current");
  var previousPage = document.querySelectorAll(".flipped")[0];

  if(!previousPage) return;

  currentPage.classList.toggle("current");

  previousPage.classList.toggle("current");
  previousPage.classList.toggle("prev");
  previousPage.classList.toggle("flipped");
  
};

var performGesture = function(e) {
    e.preventDefault();
    if(!e.changedTouches[0]) return;
    var gesture = gestures[e.changedTouches[0].identifier];
    console.log("GESTURE:");
    var dx = e.changedTouches[0].screenX - gesture.x;
    if(dx < -SWIPE_THRESHOLD) {
      console.log("FLIP FORWARD");
      flipForward();
    } else if(dx > SWIPE_THRESHOLD) {
      console.log("FLIP BACK")
      flipBack();
    }
};

/*
document.body.addEventListener("touchstart", function(e) {
    e.preventDefault();
    if(!e.touches[0]) return;
    gestures[e.touches[0].identifier] = {x: e.touches[0].screenX, y: e.touches[0].screenY};
});
document.body.addEventListener("touchend", performGesture);
document.body.addEventListener("touchleave", performGesture);
/*
document.body.addEventListener("click", function(e) {
  if(e.clientX > (window.innerWidth / 2)) {
    flipForward();
  } else {
    flipBack();
  }
});
*/

var startX = 0, pressed = false, touchID = null;
document.body.addEventListener("touchstart", function(e) {
  e.preventDefault();
  startX = e.touches[0].screenX;
  touchID = e.touches[0].identifier;
  pressed = true;
});

document.body.addEventListener("touchend", function(e) {
  e.preventDefault();
    
  pressed = false;
  var diff = 180.0 * (Math.min(startX - e.changedTouches[0].screenX, 200) / 200.0);
  if(diff > -45 && diff < 0) {
    document.querySelector(".current").style.webkitTransform = "rotateY(0deg)";
  } else if(diff < -45) {
    document.querySelector(".current").style.webkitTransform = "rotateY(180deg)";
    flipForward();
  } else {
    flipBack();
  }
});

document.body.addEventListener("touchmove", function(e) {
  e.preventDefault();

  var diff = 180.0 * (Math.min(e.changedTouches[0].screenX - startX, 200) / 200.0);
  console.log(diff);
  document.querySelector(".current").style.webkitTransform = "rotateY(" + diff + "deg)";
});
