

const loadingMask = document.getElementById("loading-mask");

window.onload = function() {
  loadingMask.style.transition = '0.3s ease';
  loadingMask.style.opacity = 0;
  setTimeout(function(){
    loadingMask.style.display = "none";
  }, 300);
}
