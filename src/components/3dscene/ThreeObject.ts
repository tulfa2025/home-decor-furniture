import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class ThreeDBasic {
  constructor(canvasRef, glbRef) {
    this._glbRef = glbRef;
    this._domObj = canvasRef;
    this._initialize();
  }

  _initialize() {
    // Get the DOM element's bounding rectangle
    const rect = this._domObj.getBoundingClientRect();

    // Initialize WebGLRenderer
    this._threejs = new THREE.WebGLRenderer();
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio); // High DPI support
    this._threejs.setSize(rect.width, rect.height); // Set the renderer size to match the DOM element's size
    this._domObj.appendChild(this._threejs.domElement);

    // Inside the ThreeDBasic class, in the _initialize() method
    this._threejs.setClearColor(0xffffff, 1); // White background

    // Resize event listener
    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      false
    );

    // Set up the camera
    const fov = 40;
    const aspect = rect.width / rect.height; // Aspect ratio based on element size
    const near = 0.1;
    const far = 10000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Create the scene
    this._scene = new THREE.Scene();

    // // Add a Directional Light
    // Add directional light (shines in one direction)
    const light = new THREE.DirectionalLight(0xfeffff, 1);
    light.position.set(20, 2, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = 0.01;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 1.0;
    light.shadow.camera.far = 1000;
    light.shadow.left = 10;
    light.shadow.right = -10;
    light.shadow.top = 10;
    light.shadow.bottom = -10;

    this._scene.add(light);

    // Add Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft ambient light
    this._scene.add(ambientLight);

    // Orbit controls
    // Set up OrbitControls (interactive camera control)
    this._controls = new OrbitControls(this._camera, this._threejs.domElement);
    this._controls.enableDamping = true; // Smooth damping
    this._controls.dampingFactor = 0.25; // Damping factor (slows down the camera movement)
    this._controls.enableZoom = true; // Allow zooming

    this._camera.position.set(0, 1, 4); // Position the camera
    this._controls.update();

    this.target = new THREE.Object3D();
    this.intersectionPoint = new THREE.Vector3()
    this.planeNormal = new THREE.Vector3()
    this.plane = new THREE.Plane()
    this.raycaster = new THREE.Raycaster()
    // Set up raycasting for mouse tracking
    this.pointer = new THREE.Vector2();

    const onMouseMove = (e) => {
      this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      this.planeNormal.copy(this._camera.position).normalize();
      this.plane.setFromNormalAndCoplanarPoint(this.planeNormal, this._scene.position)
      this.raycaster.setFromCamera(this.pointer, this._camera);
      this.raycaster.ray.intersectPlane(this.plane, this.intersectionPoint);
      this.target.position.set(this.intersectionPoint.x, -this.intersectionPoint.y, 2)
    };

    window.addEventListener("mousemove", onMouseMove);

    // Set up any model loading if needed (you can call this._LoadModel() if it's needed)

    this._LoadModel();
    // Call the animation loop
    this._RAF();
  }

  _OnWindowResize() {
    // Ensure renderer and camera are updated on window resize
    const rect = this._domObj.getBoundingClientRect();
    this._threejs.setSize(rect.width, rect.height);
    this._camera.aspect = 1920 / 1080; // Update aspect ratio
    this._camera.updateProjectionMatrix(); // Apply the new aspect ratio
  }

  _LoadModel() {
    const loader = new GLTFLoader();
    loader.load(this._glbRef, (gltf) => {
      this._model = gltf.scene;
      this._model.position.set(0, -1, 0); // Set the model's position to (0, 0, 0)
      this._model.traverse((c) => {
        c.castShadow = true;
      });

      this._scene.add(this._model);
    });
  }

  _rotateModelToFacePoint() {

    this._model.lookAt(this.target.position);
  }

  _RAF() {
    requestAnimationFrame(() => {

      // Rotate the model to face the mouse position
      if (this._model) {
        this._rotateModelToFacePoint();
      }
      this._controls.update();
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }

  /* Rotate camera depening of position of mouse on the screen */
  followMouse(e) {}
}

export default ThreeDBasic;
