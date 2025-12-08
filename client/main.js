// Подключаем Three.js и GLTFLoader через CDN
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

// Создаём сцену
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Камера
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

// Рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Свет
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Загрузка модели
const loader = new GLTFLoader();
let player1, player2;

loader.load(
  'assets/player.glb', // путь к модели
  (gltf) => {
    // Два игрока из одной модели
    player1 = gltf.scene.clone();
    player1.position.set(-1.5, 0, 0);
    scene.add(player1);

    player2 = gltf.scene.clone();
    player2.position.set(1.5, 0, 0);
    scene.add(player2);
  },
  undefined,
  (error) => {
    console.error('Ошибка загрузки модели:', error);
  }
);

// Анимация
function animate() {
  requestAnimationFrame(animate);
  if (player1) player1.rotation.y += 0.01;
  if (player2) player2.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Подгон под размер окна
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
