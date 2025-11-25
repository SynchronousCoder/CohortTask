import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import gsap from 'gsap';

// Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3.5;
// scene.add(camera);

// Renderer
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.physicallyCorrectLights = true; // You can use physicallyCorrectLighting for newer Three.js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// Postprocessing
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms['amount'].value = 0.003;
composer.addPass(rgbShiftPass);

// Use correct class PMREMGenerator
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

// HDR Environment Loader
const hdriUrl = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/pond_bridge_night_1k.hdr';

let gltfModel = null;

new RGBELoader().load(hdriUrl, (hdrMap) => {
  hdrMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = hdrMap;
  loadGLTFModel();
});

function loadGLTFModel() {
  new GLTFLoader().load(
    './DamagedHelmet.gltf',
    (gltf) => {
      gltfModel = gltf.scene;
      scene.add(gltfModel);
    },
    undefined,
    (error) => {
      console.error('An error happened while loading the GLTF model', error);
    }
  );
}

window.addEventListener("mousemove", (e) => {
  if (gltfModel) {
    const rotationX = (e.clientY / window.innerHeight - 0.5) * ( Math.PI * 0.45 );
    const rotationY = (e.clientX / window.innerWidth - 0.5) * ( Math.PI * 0.45 );
    gsap.to(gltfModel.rotation, { 
      x: rotationX, 
      y: rotationY, 
      duration: 0.6, 
      ease: "power2.out" 
    });
  }
});
// Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  if (gltfModel) gltfModel.rotation.y += 0.00;
  composer.render();
}
animate();