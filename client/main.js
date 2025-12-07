import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';
import * as Colyseus from 'https://cdn.jsdelivr.net/npm/colyseus.js@0.15.0/dist/colyseus.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Пол
const planeGeo = new THREE.PlaneGeometry(50,50);
const planeMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = Math.PI / 2;
scene.add(plane);

// Свет
const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,20,10);
scene.add(light);

const loader = new GLTFLoader();

// Игрок
let player;
loader.load('assets/player.glb', gltf => {
    player = gltf.scene;
    player.scale.set(1,1,1);
    scene.add(player);
});

// ПК
loader.load('assets/pc.glb', gltf => {
    const pc = gltf.scene;
    pc.scale.set(0.5,0.5,0.5);
    pc.position.set(2,0,2);
    scene.add(pc);
});

// Камера
loader.load('assets/camera.glb', gltf => {
    const cam = gltf.scene;
    cam.scale.set(0.3,0.3,0.3);
    cam.position.set(1,0,2);
    scene.add(cam);
});

// Казино
loader.load('assets/casino.glb', gltf => {
    const casino = gltf.scene;
    casino.scale.set(1.5,1.5,1.5);
    casino.position.set(-10,0,0);
    scene.add(casino);
});

// NPC
loader.load('assets/npc.glb', gltf => {
    const npc = gltf.scene;
    npc.scale.set(0.5,0.5,0.5);
    npc.position.set(-2,0,-2);
    scene.add(npc);
});

camera.position.set(5,5,10);
camera.lookAt(0,0,0);

// Управление игроком
document.addEventListener('keydown', (e) => {
    if(!player) return;
    const step = 0.5;
    if(e.key==='w') player.position.z -= step;
    if(e.key==='s') player.position.z += step;
    if(e.key==='a') player.position.x -= step;
    if(e.key==='d') player.position.x += step;
});

// Анимация
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Подключение к серверу Colyseus
const client = new Colyseus.Client('ws://YOUR_RENDER_URL');
let room;
async function joinRoom() {
    room = await client.joinOrCreate('reporoom', { name: "Player" });
    room.onStateChange((state) => {
        console.log("Игровое состояние обновлено", state);
    });
}
joinRoom();
