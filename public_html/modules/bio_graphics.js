import {widthThreshold} from './config.js';

var canvas2 = document.getElementById('bio-graphics')
var canvas_w2 = canvas2.offsetWidth;
var canvas_h2 = canvas_w2;

if(window.innerWidth<widthThreshold){
  canvas_h2 = window.innerWidth
}

import * as THREE2 from './three.module.js';
import { NURBSCurve } from './NURBSCurve.js';

let renderer2, scene2, camera2;

init2();

function init2(){
  renderer2 = new THREE2.WebGLRenderer( { antialias: true } );
  renderer2.setPixelRatio(window.devicePixelRatio);
  renderer2.setSize(canvas_w2, canvas_h2);
  scene2 = new THREE2.Scene();
  scene2.background = new THREE2.Color("rgb(251, 251, 251)");
  camera2 = new THREE2.PerspectiveCamera(20, canvas_w2/canvas_h2, 1, 100);
  camera2.position.set(0,0,12.5)
  scene2.add(camera2)
  canvas2.appendChild(renderer2.domElement);
}

/* Build Curves
 *
 */

const nurbsControlPoints = [];
const nurbsKnots = [];
const nurbsDegree = 3;
const nurbsNum = 25;

for ( let i = 0; i <= nurbsDegree; i ++ ) {
	nurbsKnots.push( 0 );
}

for ( let i = 0, j = nurbsNum; i < j; i ++ ) {
  let x, y, z;
  if (i==0){
    x = 0;
    y = -2;
    z = 0;
  } else if (i==1){
    x = 0;
    y = -0.5;
    z = 0;
  } else if (i==nurbsNum-1){
    x = 0;
    y = 2;
    z = 0;
  } else if (i==nurbsNum-2){
    x = 0;
    y = 0.5;
    z = 0;
  } else {
    x = Math.random() * 3 - 1.5;
    y = Math.random() * 2 - 1;
    z = Math.random() * 3 - 1.5
  }
	nurbsControlPoints.push(new THREE2.Vector4(x,y,z,1));

	const knot = ( i + 1 ) / ( j - nurbsDegree );
	nurbsKnots.push( THREE2.MathUtils.clamp( knot, 0, 1 ) );

}

const nurbsCurve = new NURBSCurve( nurbsDegree, nurbsKnots, nurbsControlPoints );

const nurbsGeometry = new THREE2.BufferGeometry();
nurbsGeometry.setFromPoints( nurbsCurve.getPoints( 160 ) );

const nurbsMaterial = new THREE2.LineBasicMaterial( { color: 0x000000} );

const nurbsLine = new THREE2.Line( nurbsGeometry, nurbsMaterial );
nurbsLine.position.set( 0, 0, 0 );
scene2.add( nurbsLine );

onWindowResize2();
window.addEventListener('resize', onWindowResize2, false);

let clock = new THREE2.Clock();
let delta = 0;
// 30 fps
let interval = 1 / 30;
delta += clock.getDelta();
function draw2() {
  delta += clock.getDelta();
  if (delta  > interval) {
    nurbsLine.rotation.y += 0.01
    renderer2.render(scene2, camera2);
    delta = delta % interval;
  }
  requestAnimationFrame(draw2);
}

requestAnimationFrame(draw2);

function onWindowResize2(event) {
  if(window.innerWidth>widthThreshold){
  	renderer2.setSize(window.innerWidth*0.29, window.innerWidth*0.29);
  } else {
    renderer2.setSize(window.innerWidth*0.7, window.innerWidth);
  }
}
