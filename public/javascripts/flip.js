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

document.body.addEventListener("touchstart", function(e) {
    e.preventDefault();
    if(!e.touches[0]) return;
    gestures[e.touches[0].identifier] = {x: e.touches[0].screenX, y: e.touches[0].screenY};
});
document.body.addEventListener("touchend", performGesture);
document.body.addEventListener("touchleave", performGesture);

document.body.addEventListener("click", function(e) {
  if(e.clientX > (window.innerWidth / 2)) {
    flipForward();
  } else {
    flipBack();
  }
});

/*
var elems = document.querySelectorAll("div.page");

for(var i=0; i<elems.length; i++) {
  (function(elem) {
    elem.addEventListener("click", function(e) {
      console.log(elem)
      elem.className += " flipped";
    });
  })(elems[i]);
}
*/
