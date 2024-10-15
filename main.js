import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// DOM elements
const loadingScreen = document.getElementById("loading_scene");
const backgroundCanvas = document.getElementById("bg");
const content = document.getElementById("content");
const loadProgress = document.getElementById("load_progress");

// Scene and Renderer setup
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: backgroundCanvas,
  antialias: true, // For smoother edges
});
renderer.shadowMap.enabled = true; // Enable shadow mapping

// Camera Setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 20, 100); // Pull camera back to fit the solar system

// Orbit Controls for better navigation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.1;

// Loading Manager with progress feedback
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
  loadProgress.innerText = `Started loading: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`;
};
loadingManager.onLoad = () => {
  loadingScreen.style.display = 'none';
  backgroundCanvas.style.display = 'block';
  content.style.display = 'grid';
};
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  loadProgress.innerText = `Loading: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`;
};
loadingManager.onError = (url) => {
  console.error(`Error loading: ${url}`);
};

// Textures
const textureLoader = new THREE.TextureLoader(loadingManager);
const bgTexture = textureLoader.load('/bg.jpg');
const meTexture = textureLoader.load('/me.jpg');

// Planets' Textures
const planetTextures = {
  earth: textureLoader.load('/planets/earth.jpg'),
  sun: textureLoader.load('/planets/2k_sun.jpg'),
  mercury: textureLoader.load('/planets/mercury.jpg'),
  venus: textureLoader.load('/planets/venus.jpg'),
  mars: textureLoader.load('/planets/mars.jpg'),
  jupiter: textureLoader.load('/planets/jupiter.jpg'),
  saturn: textureLoader.load('/planets/saturn.jpg'),
  uranus: textureLoader.load('/planets/uranus.jpg'),
  neptune: textureLoader.load('/planets/neptune.jpg')
};
const earthNormalMap = textureLoader.load('/planets/earth_normal_map.tif');

// Set background as stars instead of an image
scene.background = new THREE.Color(0x000000);
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

// Create random stars for the background
const starCount = 10000;
const starVertices = [];
for (let i = 0; i < starCount; i++) {
  const x = THREE.MathUtils.randFloatSpread(2000);
  const y = THREE.MathUtils.randFloatSpread(2000);
  const z = THREE.MathUtils.randFloatSpread(2000);
  starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Lighting Setup
const sunLight = new THREE.PointLight(0xffffff, 1.5, 5000); // Intense light from the sun
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true; // Enable shadows

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Soft ambient light

scene.add(sunLight, ambientLight);

// Glow Effect for Sun (Lensflare or Bloom)
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 32),
  new THREE.MeshStandardMaterial({ map: planetTextures.sun, emissive: 0xffff00, emissiveIntensity: 1 })
);
sun.position.set(0, 0, 0);
scene.add(sun);

// Orbit Helper for Planets
function createOrbit(radius, segments = 64) {
  const orbitGeometry = new THREE.RingGeometry(radius - 0.5, radius + 0.5, segments);
  const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2;
  return orbit;
}

// Add Orbit Rings (For example, around Earth and Mars)
scene.add(createOrbit(50)); // Earth
scene.add(createOrbit(70)); // Mars

// Planet class for solar system
class Planet extends THREE.Object3D {
  constructor(radius, texture, distance, rotationSpeed, revolutionSpeed) {
    super();
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 32, 32),
      new THREE.MeshStandardMaterial({ map: texture, bumpMap: earthNormalMap, bumpScale: 0.05 })
    );
    this.mesh.castShadow = true;
    this.mesh.position.z = distance;
    this.rotationSpeed = rotationSpeed;
    this.revolutionSpeed = revolutionSpeed;
    this.add(this.mesh);
  }
}

// Create planets
const planets = [
  new Planet(1, planetTextures.mercury, 30, 0.005, 0.01 / 88),
  new Planet(1.2, planetTextures.venus, 45, 0.005, 0.01 / 225),
  new Planet(2, planetTextures.earth, 60, 0.01, 0.01 / 365), // Earth with normal map
  new Planet(1.5, planetTextures.mars, 85, 0.01, 0.01 / 687),
  new Planet(5, planetTextures.jupiter, 120, 0.02, 0.01 / 4332),
  new Planet(4, planetTextures.saturn, 160, 0.015, 0.01 / 10759),
  new Planet(3.5, planetTextures.uranus, 200, 0.01, 0.01 / 30687),
  new Planet(3, planetTextures.neptune, 240, 0.01, 0.01 / 60190)
];

planets.forEach(planet => scene.add(planet));

// Camera Movement on Scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = 100 - t * 0.01;
  camera.position.y = -t * 0.002;
}
document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the sun
  sun.rotation.y += 0.001;

  // Rotate and revolve planets
  planets.forEach(planet => {
    planet.mesh.rotation.y += planet.rotationSpeed; // Rotation around axis
    planet.rotation.y += planet.revolutionSpeed;    // Orbit around the sun
  });
  
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls.update(); // Update orbit controls
  renderer.render(scene, camera);
}
animate();
