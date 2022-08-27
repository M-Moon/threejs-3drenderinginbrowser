import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

// renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 30, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xF45670,
  wireframe: true,
});
const torusMesh = new THREE.Mesh(geometry, material); // combined
const smallerTorus = new THREE.Mesh(
  new THREE.TorusGeometry(10, 7, 23, 16),
  new THREE.MeshStandardMaterial({
    color: 0x41214F,
    wireframe: false,
  })
);

// must add to scene
scene.add(torusMesh);
scene.add(smallerTorus);

const pointLight = new THREE.PointLight(0xFFFFFF); // basic light!
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement); // controls to look around the scene

// background
const backTexture = new THREE.TextureLoader().load('assets/Beautiful-Fjord-Norway-1000x667.jpg');
scene.background = backTexture;

// texture mapping picture onto box
const selfTexture = new THREE.TextureLoader().load('assets/1651617073022.jpeg');
const myself = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: selfTexture}),
);
scene.add(myself);

const jimiTexture = new THREE.TextureLoader().load('assets/01ac0ab435b147e4d35403b2bcc8360a--famous-musicians-rock-legends.jpg');
const jimi = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jimiTexture,
    normalMap: selfTexture
  })
);
scene.add(jimi);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// adding stars to the scene with the function
Array(200).fill().forEach(addStar);

function animate() {
  requestAnimationFrame(animate);

  torusMesh.rotation.x += 0.01;
  smallerTorus.rotation.x += 0.02;
  smallerTorus.rotation.y += 0.01;
  smallerTorus.rotation.z += 0.05;

  controls.update();

  renderer.render(scene, camera);
}

animate()
