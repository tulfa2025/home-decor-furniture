import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class ThreeDBasic {
  constructor(
    canvasRef,
    glbRef,
    followMouse,
    cameraPosition = [0, 1, 3.2],
    modelPosition = [0, 0, 0],
    modelRotation = [0, 0, 0], // Note potential for gimbal locks if not careful
    initialPosition = [0, 0, 0],
    playAnimation,
    animationNames,
    defaultAnimationName,
    dragRotateEnabled = false,
    enableZoom = false
  ) {
    this._glbRef = glbRef;
    this._domObj = canvasRef;

    // INteractive controls
    this._followMouse = followMouse;
    this._dragRotateEnabled = dragRotateEnabled;
    this._enableZoom = enableZoom

    this._cameraPosition = cameraPosition; // PLacement of camera in world space
    this._initialPosition = initialPosition; // Position of mouse in world space
    this._modelPosition = modelPosition; // Position oft model in world space
    this._modelRotation = modelRotation; // initial Rotation of model

    // Animations
    this._animationNames = animationNames;
    this._playAnimation = playAnimation;
    this._defaultAnimationName = defaultAnimationName;
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
    // // Set up OrbitControls (interactive camera control)
    this._controls = new OrbitControls(this._camera, this._threejs.domElement);
    this._controls.enableDamping = true; // Smooth damping
    this._controls.dampingFactor = 0.25; // Damping factor (slows down the camera movement)
    this._controls.enableZoom = this._enableZoom; // Allow zooming
    this._controls.enableRotate = this._dragRotateEnabled

    this._camera.position.set(...this._cameraPosition); // Position the camera
    this._controls.update();


      
    

    this.target = new THREE.Object3D();
    this.target.position.x = this._initialPosition[0];
    this.target.position.y = this._initialPosition[1];
    this.target.position.z = this._initialPosition[2];
    this.intersectionPoint = new THREE.Vector3();
    this.planeNormal = new THREE.Vector3();
    this.plane = new THREE.Plane();
    this.raycaster = new THREE.Raycaster();
    // Set up raycasting for mouse tracking
    this.pointer = new THREE.Vector2();

    const onMouseMove = (e) => {
      this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      this.planeNormal.copy(this._camera.position).normalize();
      this.plane.setFromNormalAndCoplanarPoint(
        this.planeNormal,
        this._scene.position
      );
      this.raycaster.setFromCamera(this.pointer, this._camera);
      this.raycaster.ray.intersectPlane(this.plane, this.intersectionPoint);
      this.target.position.set(
        this.intersectionPoint.x,
        -this.intersectionPoint.y,
        2
      );
    };

    if (this._followMouse) window.addEventListener("mousemove", onMouseMove);

    // Set up any model loading if needed (you can call this._LoadModel() if it's needed)

    this._LoadModel();
    // Call the animation loop
    this._RAF();
  }

  _OnWindowResize() {
    // Ensure renderer and camera are updated on window resize
    const rect = this._domObj.getBoundingClientRect();
    this._threejs.setSize(rect.width, rect.height);
    this._camera.aspect = rect.width / rect.height; // Update aspect ratio
    this._camera.updateProjectionMatrix(); // Apply the new aspect ratio
  }

  _LoadModel() {
    const loader = new GLTFLoader();
    loader.load(this._glbRef, (gltf) => {
      this._model = gltf.scene;
      this._model.position.set(...this._modelPosition); // Set the model's position to (0, 0, 0)
      this._model.rotation.set(...this._modelRotation);

      this._model.traverse((c) => {
        c.castShadow = true;
      });

      this._scene.add(this._model);

      // IF no animations then return
      if (!this._animationNames.length) return;

      this.animations = gltf.animations;

      const defaultAnimation = this.animations.find((animation) => {
        if (animation.name === this._defaultAnimationName) return animation;
      });

      this.mixer = new THREE.AnimationMixer(this._model);

      let action = this.mixer.clipAction(defaultAnimation, this._model);
      action.play();
    });
  }

  _rotateModelToFacePoint() {
    // Get the direction vector from the model to the mouse
    const direction = new THREE.Vector3()
      .subVectors(this.target.position, this._model.position)
      .normalize();

    // Calculate the angle the model needs to rotate to face the mouse
    const angle = Math.atan2(direction.x, direction.z);
    this._model.rotation.y = Math.max(
      Math.min(angle, Math.PI / 12),
      -Math.PI / 12
    ) + this._modelRotation[1];

    const angleX = Math.atan2(
      direction.y,
      Math.sqrt(direction.x * direction.x + direction.z * direction.z)
    );
    this._model.rotation.x = Math.max(
      Math.min(-angleX, Math.PI / 16),
      -Math.PI / 24
    );
  }

  playAnimation(playAnimation: boolean) {
    if (!this.animations) return;

    const oldAnimation = this.animations.find((animation) => {
      if (animation.name === this._defaultAnimationName) return animation;
    });

    let oldAction = this.mixer.clipAction(oldAnimation, this._model);

    if (playAnimation) {
      oldAction.play();
    } else {
      oldAction.stop();
      oldAction.reset();
    }
  }

  changeAnimation(animationName: string) {
    if (!this.animations) return;

    const oldAnimation = this.animations.find((animation) => {
      if (animation.name === this._defaultAnimationName) return animation;
    });

    let oldAction = this.mixer.clipAction(oldAnimation, this._model);
    oldAction.stop();
    oldAction.reset();

    const newAnimation = this.animations.find((animation) => {
      if (animation.name === animationName) return animation;
    });
    this._defaultAnimationName = animationName;

    let action = this.mixer.clipAction(newAnimation, this._model);
    action.play();
  }

  _RAF() {
    requestAnimationFrame(() => {
      // Rotate the model to face the mouse position
      if (this._model && this._followMouse) {
        this._rotateModelToFacePoint();
      }
      if (this.mixer) {
        this.mixer.update(1 / 60); // Adjust time increment as needed
      }
      this._controls.update();
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}

export default ThreeDBasic;
