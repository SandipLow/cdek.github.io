import * as THREE from "three"
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const loadingScr = document.getElementById("loading_scene")
const bg = document.getElementById("bg")
const content = document.getElementById("content")
const load_progress = document.getElementById("load_progress")

// All pre loaders : scene, cam & renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

// const helpcam = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas : bg,
});

// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.x = 5;
camera.position.y = 10;
camera.position.z = 20;
// helpcam.position.setZ(30);

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	load_progress.innerText = `Started loading file: ${url} .\nLoaded ${itemsLoaded} of ${itemsTotal} files.`

};

loadingManager.onLoad = function () {
	loadingScr.style.display = 'none';
  bg.style.display = 'block'
  content.style.display = 'grid'
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal ) {

	load_progress.innerText = `Loading file:  ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`;

};

loadingManager.onError = function (url) {

	console.error( 'There was an error loading ' + url );

};

const textureLoader = new THREE.TextureLoader(loadingManager);
const binaryTextureLoader = new THREE.BinaryTextureLoader(loadingManager);

// Texture :
const bg_texture = textureLoader.load('./assets/bg.jpg');
const me_texture = textureLoader.load('./assets/me.jpg');
const me_pix_texture = textureLoader.load('./assets/me_pixel.png');
const earth_texture = textureLoader.load('./assets/planets/earth.jpg');
const sun_texture = textureLoader.load('./assets/planets/2k_sun.jpg');
const earth_normal = binaryTextureLoader.load('./assets/planets/earth_normal_map.tif');
const mercury_texture = textureLoader.load('./assets/planets/mercury.jpg');
const venus_texture = textureLoader.load('./assets/planets/venus.jpg');
const mars_texture = textureLoader.load('./assets/planets/mars.jpg');
const jupiter_texture = textureLoader.load('./assets/planets/jupiter.jpg');
const saturn_texture = textureLoader.load('./assets/planets/saturn.jpg');
const uranus_texture = textureLoader.load('./assets/planets/uranus.jpg');
const neptune_texture = textureLoader.load('./assets/planets/neptune.jpg');

scene.background = bg_texture;

// Cube :
const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshBasicMaterial( {map: me_texture} );
const cube = new THREE.Mesh( geometry, material );

cube.position.set(20, 0, 0);

scene.add(cube);


// Cube2 :
const cube2 = new THREE.Mesh( 
  new THREE.BoxGeometry( 10, 10, 10 ),
  new THREE.MeshBasicMaterial( {map: me_pix_texture} ) 
);

cube2.position.set(20, 0, 30);

scene.add(cube2);


// Sun : 
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10),
  new THREE.MeshStandardMaterial( {
    // color: 0xffcc66, 
    // emissive: 0xff0000, 
    // emissiveIntensity: 5
    map: sun_texture
  } )
);

scene.add(sun);


// Earth : 
const earth_mesh = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshStandardMaterial( {map: earth_texture, normalMap: earth_normal} )
);
const earth = new THREE.Object3D();
earth_mesh.position.z = 46.5
earth.add(earth_mesh)

scene.add(earth);

// Planets : 
class Planet extends THREE.Object3D {
  constructor (radius, texture, distance, rotation_speed, revolution_speed) {
    super();
    this.radius = radius;
    this.texture = texture;
    this.distance = distance;
    this.rotation_speed = rotation_speed;
    this.revolution_speed = revolution_speed;
    
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(this.radius),
      new THREE.MeshBasicMaterial( {map: this.texture} )
    );

    this.mesh.position.z = this.distance;
    super.add(this.mesh);
  }
}

let mercury = new Planet(0.5, mercury_texture, 17.5, 0.01/176, 0.01/0.2);
let venus = new Planet(1, venus_texture, 33.5, 0.01/100, 0.01/0.6);
let mars = new Planet(1.5, mars_texture, 71, 0.01, 0.01/2);
let jupiter = new Planet(3, jupiter_texture, 200, 0.01/0.4, 0.01/10);
let saturn = new Planet(2.5, saturn_texture, 400, 0.01/0.4, 0.01/30);
let uranus = new Planet(2, uranus_texture, 800, 0.01/0.7, 0.01/80);
let neptune = new Planet(2, neptune_texture, 1200, 0.01/0.7, 0.01/160);


let planets = [mercury, venus, mars, jupiter, saturn, uranus, neptune];

planets.forEach(planet => scene.add(planet))


// Lighting : 
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);





// Helper :
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// const camhelper = new THREE.CameraHelper(camera);
// scene.add( camhelper, gridHelper);

// const controls = new OrbitControls(helpcam, renderer.domElement);


// Scroll Animation :
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  camera.position.z = 20 - t * 0.01;
  camera.position.y = -t * 0.002;
  // camera.rotation.x = t * 0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


// Animation Loop :
function animate () {
  requestAnimationFrame(animate);
  earth_mesh.rotateOnAxis(
    new THREE.Vector3(0.39, 0.92, 0),
    0.01
  );
  earth.rotation.y += 0.01;

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  planets.forEach(planet => {
    planet.mesh.rotation.y += planet.rotation_speed;
    planet.rotation.y += planet.revolution_speed;
  })

  // renderer.render(helpcam);
    
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.render(scene, camera);
}

animate();
