var sections;
var identifiers;
var width;

var currentSection = -1;
var minDistance = 0;

let updateScrollMenu = function(){
  minDistance = 0
  for (var i = 0; i < sections.length; i++){
    var d = identifiers[i].getBoundingClientRect().top
    if ( d <= 56) {
      if (Math.abs(d) >= minDistance){
        minDistance = d
        currentSection = i
      }
    }
  }
  if (minDistance == 0){
    currentSection = -1
  }
  for (var i = 0; i < sections.length; i++){
    if (currentSection == i){
      sections[i].style.position = "fixed"
      sections[i].style.top = "56px"
      identifiers[i].style.height = 0.09*width + "px"
    } else {
      sections[i].style.position = "relative"
      sections[i].style.top = "0"
      identifiers[i].style.height = 0
    }
  }
}


identifiers = document.getElementsByClassName("section-identifier")
sections = document.getElementsByClassName("section-title")

// console.log(identifiers)


width = window.innerWidth;
window.addEventListener("scroll",updateScrollMenu)
