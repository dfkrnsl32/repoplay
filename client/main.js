// THREE.js + GLTFLoader
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

// Сцена
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Пол
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0x444444 })
);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Свет
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// Загрузчик моделей
const loader = new GLTFLoader();

// Два игрока
let player1;
let player2;

// Загрузка player1
loader.load('assets/player1.glb', (gltf) => {
    player1 = gltf.scene;
    player1.position.set(0, 0, 0);
    player1.scale.set(1, 1, 1);
    scene.add(player1);
});

// Загрузка player2
loader.load('assets/player2.glb', (gltf) => {
    player2 = gltf.scene;
    player2.position.set(3, 0, 0); // второй игрок справа
    player2.scale.set(1, 1, 1);
    scene.add(player2);
});

// Управление главным игроком (player1)
document.addEventListener('keydown', (e) => {
    if (!player1) return;

    const step = 0.3;

    if (e.key === 'w') player1.position.z -= step;
    if (e.key === 's') player1.position.z += step;
    if (e.key === 'a') player1.position.x -= step;
    if (e.key === 'd') player1.position.x += step;
});

// Камера
camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);

// Анимация
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
