import {widthThreshold} from '../../modules/config.js';

var isSolutionOpen = 0;
var width = window.innerWidth;

let toggleSolution = function(){
  if (isSolutionOpen==0){
    if (width > widthThreshold){
      solution.style.height = '75vw';
    } else {
      solution.style.height = '240vw';
    }
    isSolutionOpen = 1;
  } else {
    solution.style.height = '0';
    isSolutionOpen = 0;
  }
}


const solution = document.getElementById("solution")
const solution_toggle = document.getElementById("solution-toggle")

solution_toggle.addEventListener("click", toggleSolution, false);

// toggleSolution()
