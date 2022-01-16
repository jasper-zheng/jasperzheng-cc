import {widthThreshold} from './config.js';

/* Canvas Settings
 *
 */
var canvas = document.getElementById('landing-graphics')
// var canvas = document.querySelector("canvas");
// canvas.style.background = "rgba(251,251,251,1)";
var mouseX = 1;
var mouseY = 1;
var canvas_w = canvas.offsetWidth;
var canvas_h = canvas_w*0.9;


import * as THREE from './three.module.js';
import vertexShader from './awCircleVertexShader.js';
import fragmentShader from './awCircleFragmentShader.js';
/* Three Setup
 *
 */

let renderer, scene, camera, uniforms;

init();

function init(){
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas_w, canvas_h);
  scene = new THREE.Scene();
  scene.background = new THREE.Color("rgb(244, 244, 244)");
  camera = new THREE.PerspectiveCamera(30, canvas_w/canvas_h, 1, 1000);
  camera.position.set(0,0,1)
  scene.add(camera)
  canvas.appendChild(renderer.domElement);
}


/* Build Scene
 *
 */

var geometry = new THREE.PlaneBufferGeometry(2, 2);
uniforms = { time: { type: 'f', value: 1.0 },
             resolution: { type: 'v2', value: new THREE.Vector2() },
             mouse: {type: "v2", value: new THREE.Vector2()}
           };
var material = new THREE.ShaderMaterial({ uniforms: uniforms,
                                          vertexShader: vertexShader,
                                          fragmentShader: fragmentShader
                                        });
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

onWindowResize();
window.addEventListener('resize', onWindowResize, false);

function draw() {
  uniforms.time.value += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

function onWindowResize(event) {
  if(window.innerWidth>widthThreshold){
  	renderer.setSize(window.innerWidth*0.5, window.innerWidth*0.5*0.9);
  	uniforms.resolution.value.x = renderer.domElement.width;
  	uniforms.resolution.value.y = renderer.domElement.height;
  } else {
    renderer.setSize(window.innerWidth, window.innerWidth*0.9);
  	uniforms.resolution.value.x = renderer.domElement.width;
  	uniforms.resolution.value.y = renderer.domElement.height;
  }
}
