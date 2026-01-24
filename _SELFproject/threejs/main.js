import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// Create scene
const scene = new THREE.Scene();

// Studio lighting setup
// Key light (main light) - bright and positioned to the front-right
const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(5, 10, 7.5);
scene.add(keyLight);

// Fill light (softer, less intense) - positioned to the front-left
const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
fillLight.position.set(-5, 3, 5);
scene.add(fillLight);

// Rim/back light - positioned behind to create edge highlights
const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
rimLight.position.set(-5, 5, -5);
scene.add(rimLight);

// Ambient light - subtle overall illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create box geometry
// const geometry = new THREE.CylinderGeometry(5, 5, 5, 32);
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Create basic material
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00});

// Create mesh (box)
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position camera
camera.position.z = 5;

// Create renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Make responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

let controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.autoRotate = true;
// Animation loop
function animate() {
    window.requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}
animate();  