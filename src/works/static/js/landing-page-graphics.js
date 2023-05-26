import * as THREE from './three.module.js';
import vertexShader from './awCircleVertexShader.js';
import fragmentShader from './awCircleFragmentShader.js';


var canvas = document.getElementById('landing-graphics')


var mouseX = 1;
var mouseY = 1;
var canvas_w = canvas.offsetWidth;
var canvas_h = canvas_w*0.9;
// console.log(canvas_w)

/* Three Setup
 *
 */

let renderer, scene, camera, uniforms;


init();

function init(){
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(canvas_w, canvas_h);
  scene = new THREE.Scene();
  scene.background = new THREE.Color("rgb(245, 245, 245)");
  camera = new THREE.PerspectiveCamera(30, canvas_w/canvas_h, 1, 1000);
  camera.position.set(0,0,1)
  scene.add(camera)
  canvas.appendChild(renderer.domElement);
}


/* Build Scene
 *
 */

var geometry = new THREE.PlaneBufferGeometry(2, 2);
// const geometry = new THREE.BoxGeometry();
// const displacement = new Float32Array([0, 0.5, 1]);
// geometry.setAttribute('displacement', new THREE.BufferAttribute(displacement, 1));

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

var curPos = {};
curPos.x = 0;
curPos.y = 0;

var dt = 0.005

var desPos = {};
desPos.x = 0;
desPos.y = 0;

var canvas_off_w, canvas_off_h
var canvas_pos_x, canvas_pos_y

onWindowResize();
window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', onMouseMove, false);

function draw() {
  updateDesPos()
  uniforms.mouse.value.x = desPos.x
  uniforms.mouse.value.y = desPos.y

  uniforms.time.value += 0.012;
  renderer.render(scene, camera);

  requestAnimationFrame(draw);
}


requestAnimationFrame(draw);

function onWindowResize(event) {

  if(window.innerWidth>766){
    canvas_off_w = 1350*0.5
    canvas_off_h = 1350*0.5*0.9
  	renderer.setSize(canvas_off_w, canvas_off_h);
  	uniforms.resolution.value.x = renderer.domElement.width;
  	uniforms.resolution.value.y = renderer.domElement.height;
    canvas_pos_x = canvas.getBoundingClientRect().right - canvas_off_w/2*0.7
    canvas_pos_y = canvas.getBoundingClientRect().bottom - canvas_off_h/2*0.7
  } else {
    canvas_off_w = 1350*0.5
    canvas_off_h = 1350*0.5*0.9
    renderer.setSize(canvas_off_w, canvas_off_h);
  	uniforms.resolution.value.x = renderer.domElement.width;
  	uniforms.resolution.value.y = renderer.domElement.height;
    canvas_pos_x = canvas.getBoundingClientRect().right + canvas_off_w/2*0.5
    canvas_pos_y = canvas.getBoundingClientRect().bottom - canvas_off_h/2*0.2
  }
  
}

// console.log(canvas.getBoundingClientRect().right + ' ' + canvas.getBoundingClientRect().bottom)
function onMouseMove(e){
  // console.log((e.clientX/window.innerWidth * 2 - 1) + " " + (e.clientY/window.innerHeight * 2 - 1))
  curPos.x = (e.clientX - canvas_pos_x)/window.innerWidth
  curPos.y = (e.clientY - canvas_pos_y)/window.innerHeight
  // console.log(curPos)
}

function updateDesPos(){
  desPos.x += (curPos.x - desPos.x) * dt
  desPos.y += (curPos.y - desPos.y) * dt
}

