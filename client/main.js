import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js";

// Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Камера
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 3);

// Рендер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Загрузка модели
const loader = new GLTFLoader();
let player;

loader.load("assets/player.glb", (gltf) => {
    player = gltf.scene;
    player.position.set(0, 0, 0);
    scene.add(player);
});

// Свет
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(3, 10, 5);
scene.add(light);

// Анимация
function animate() {
    requestAnimationFrame(animate);
    if (player) player.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
