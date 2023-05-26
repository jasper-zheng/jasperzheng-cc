var cur_index = 0;

var slides;
var thumbs;
var num_of_slides;

slides = document.getElementsByClassName("slide");
thumbs = document.getElementsByClassName("thumb");
num_of_slides = slides.length

var container = document.getElementById("slides-container");

updateDisplay(cur_index)
initListeners()

const calcHeightAfterLoaded = setTimeout(updateContainerHeight, 1000);

function updateContainerHeight(){
	container.style.height = slides[cur_index].offsetHeight + parseInt(getComputedStyle(container)['paddingBottom']) + 'px'
}

function updateDisplay(cur_index){
	for (var i = 0; i < num_of_slides; i++){
		slides[i].style.display = i == cur_index ? 'block' : 'none'
		thumbs[i].style.opacity = i == cur_index ? 1 : 0.18
	}
	updateContainerHeight()
}

function initListeners() {
	for (var i = 0; i < num_of_slides; i++){
		thumbs[i].idx = i
		thumbs[i].addEventListener('click', switchIndex)
		thumbs[i].addEventListener('mouseover', function(e){e.currentTarget.style.opacity = e.currentTarget.idx == cur_index ? 1 : 0.6})
		thumbs[i].addEventListener('mouseout', function(e){e.currentTarget.style.opacity = e.currentTarget.idx == cur_index ? 1 : 0.18})
	}
}

function switchIndex(e){
	cur_index = e.currentTarget.idx
	updateDisplay(cur_index)
}



function windowResize() {
  heightOutput.textContent = window.innerHeight;
  widthOutput.textContent = window.innerWidth;
}

window.onresize = updateContainerHeight;