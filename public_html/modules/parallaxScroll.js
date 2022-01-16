const landingGraphics = document.getElementById("landing-graphics");
const landingLogo = document.getElementById("landing-logo");
const landingSubtitle = document.getElementById("landing-subtitle");

window.addEventListener("scroll", function() {
  let offset = window.pageYOffset;
  if (offset <= window.innerHeight) {
    let fade = 1 - offset / (window.innerHeight-window.innerWidth*0.2);
    landingGraphics.style.opacity = fade;
    landingGraphics.style.transform = "translateY(" + offset * 0.1 +"px)";

    landingLogo.style.transform = "translateY(" + offset * 0.4 +"px)";
    landingLogo.style.opacity = fade;

    landingSubtitle.style.transform = "translateY(" + offset * 0.13 +"px)";
    landingSubtitle.style.opacity = fade;

  }

})
