import * as THREE from "three";
import * as dat from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

//TEXTURES
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambiantOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const metalnessTexure = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");


colorTexture.repeat.x = 2
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping

loadingManager.onStart = () => {
  console.log("start");
};
loadingManager.onLoad = () => {
  console.log("loaded !");
};
loadingManager.onProgress = () => {
  console.log("progress ..");
};
loadingManager.onError = () => {
  console.log("error");
};

const gui = new dat.GUI();
const params = {
  spin: () => {
    gsap.to(cube1.rotation, {
      duration: 1,
      y: cube1.rotation.y + Math.PI * 2,
    });
  },
};
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});
const scene = new THREE.Scene();

const group = new THREE.Group();
// scene.add(group);

// const geometry = new THREE.BufferGeometry();
// const count = 50;
// const positionArray = new Float32Array(count * 3 * 3);
// for (let i = 0; i < count * 3 * 3; i++) {
//   positionArray[i] = Math.random() - 0.5 * 4
// }
// const positionsAttribute = new THREE.BufferAttribute(positionArray, 3)
// geometry.setAttribute('position', positionsAttribute)

// const material = new THREE.MeshBasicMaterial({
//   color: "red",
//   wireframe: true,
// });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
  new THREE.MeshBasicMaterial({ map: colorTexture, wireframe: false })
);


scene.add(cube1);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" })
);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);

cube2.position.x = -2;
cube3.position.x = 2;

group.position.y = 1;
// group.add(cube1, cube2, cube3);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
gui.add(axesHelper, "visible").name("XYZ axes");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  //Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitFullscreenElement) {
      canvas.webkitFullscreenElement();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      document.webkitFullscreenElement();
    }
  }
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

// Camera orthograpic
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);

scene.add(camera);

//Controles

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
camera.position.z = 2;

// WITH DATE NOW
// let time = Date.now();

// function tick() {
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime

//   cube1.rotation.y += 0.001 * deltaTime;
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// }

const clock = new THREE.Clock();
function tick() {
  // const elapsedTime = clock.getElapsedTime();

  //UPDATE CAMERA
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = -(cursor.y * 3);
  // camera.lookAt(cube1.position);
  // cube1.rotation.y = Math.sin(elapsedTime);
  // cube1.rotation.x = Math.cos(elapsedTime);

  //UPDATE CONTROLS
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

//DEBUG
gui.add(cube1.position, "y").min(-3).max(3).step(0.01);
gui.add(cube1.material, "wireframe");
gui.addColor(cube1.material, "color");
gui.add(params, "spin");
tick();
