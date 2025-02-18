import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MovementPath from "./AnimationHelper";

class ThreeDBasic extends EventTarget {
  private _domObj: HTMLElement | null = null;
  private _glbRef: string | null = null;

  /* LIGHTING OPTIONS */
  private _modelShadow: boolean = false;
  private _lightingArray: Array<THREE.Light> = [];

  /* UTILITY PROPERTIES */
  public isLoaded: boolean = false;
  private _pathToBackground: string = "";

  /* INTERACTIVE CONTROLS */
  private _followMouse: boolean = false;
  private _dragRotateEnabled: boolean = false;
  private _enableZoom: boolean = false;

  /* POSITIONING PROPERTIES */
  private _cameraPosition: [number, number, number] | null = null;
  private _modelPosition: [number, number, number] | null = null;
  private _initialPosition: [number, number, number] | null = null;
  private _modelRotation: [number, number, number] | null = null;

  /* ANIMATION DETAILS */
  private _animations: Array<any> | null = null;
  private _animationList: AnimationDetailsList | null = null;
  private _playAnimation: boolean = true;
  private _defaultAnimationName: string | null = null;
  private _mixer: THREE.AnimationMixer | null = null;

  // REaltes to camera movement animation from MovementPath
  private _currentCameraMovementPath: MovementPath | null = null;

  /* THREEJS OBJECTS */
  private _threejs: THREE.WebGLRenderer | null = null;
  private _camera: THREE.PerspectiveCamera | null = null;
  private _scene: THREE.Scene | null = null;
  private _controls: OrbitControls | null = null;

  /* THREE JS SPECIFIC OBJECTS IN SCENE */
  private _plane: THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.MeshBasicMaterial,
    THREE.Object3DEventMap
  > | null = null;

  /* MOUSE FOLLOW PROPERTIES */
  _target: THREE.Object3D<THREE.Object3DEventMap> | null = null;
  _intersectionPoint: THREE.Vector3 | null = null;
  _planeNormal: THREE.Vector3 | null = null;
  _intersectionPlane: THREE.Plane | null = null;
  _raycaster: THREE.Raycaster | null = null;
  _pointer: THREE.Vector2 | null = null;

  /**
   * @param {HTMLElement} canvasRef  Canvas element reference
   * @param {string} glbRef       Path to GLB file in public folder
   * @param {boolean} followMouse Toggle model follow mouse cursor position
   * @param {[number, number, number]} cameraPosition   x, y, z position of camera relative to origin
   * @param {[number, number, number]} modelPosition    x, y, z position of model relative to origin
   * @param {[number, number, number]} modelRotation    x, y, and -axis rotation of model
   * @param {[number, number, number]} initialPosition  Initial cursor position in space on render
   * @param {boolean} playAnimation
   * @param {AnimationDetailsList} animationList  Animation details
   * @param {string} defaultAnimationName  Default animation to play
   * @param {boolean} dragRotateEnabled Drag model toggle
   * @param {boolean} enableZoom Toggle zoom
   * @param {string} pathToBackground
   * @param {Array<any>}lightingArray ThreeJS Light Objects for scene lighting
   * @param {boolean} modelShadow Toggle whether model receives shadows
   */

  constructor(
    canvasRef,
    glbRef,
    followMouse,
    cameraPosition = [0, 1, 3.2],
    modelPosition = [0, 0, 0],
    modelRotation = [0, 0, 0], // Note potential for gimbal locks if not careful
    initialPosition = [0, 0, 0],
    playAnimation,
    animationList: AnimationDetailsList = null,
    defaultAnimationName,
    dragRotateEnabled = false,
    enableZoom = false,
    pathToBackground = "",
    lightingArray,
    modelShadow = false,
    dragRotateLimit= false
  ) {
    super();

    this._modelShadow = modelShadow;
    this._glbRef = glbRef;
    this._domObj = canvasRef;
    this.isLoaded = false;

    this._lightingArray = lightingArray;

    this._pathToBackground = pathToBackground;

    // INteractive controls
    this._followMouse = followMouse;
    this._dragRotateEnabled = dragRotateEnabled;
    this._dragRotateLimit = dragRotateLimit;
    this._enableZoom = enableZoom;

    this._cameraPosition = cameraPosition; // PLacement of camera in world space
    this._initialPosition = initialPosition; // Position of mouse in world space
    this._modelPosition = modelPosition; // Position oft model in world space
    this._modelRotation = modelRotation; // initial Rotation of model

    // Animations
    this._animationList = animationList;
    this._playAnimation = playAnimation;
    this._defaultAnimationName = defaultAnimationName;

    if (this._animationList) {
      const details = Object.values(animationList).find((animation) => {
        if (animation.name === defaultAnimationName) return true;
        return false;
      });

      this._currentCameraMovementPath = details.animation;
    }

    this._initialize();
  }

  _initialize() {
    // Get the DOM element's bounding rectangle
    const rect = this._domObj.getBoundingClientRect();

    // Initialize WebGLRenderer
    this._threejs = new THREE.WebGLRenderer({ antialias: true });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio); // High DPI support
    this._threejs.setSize(rect.width, rect.height); // Set the renderer size to match the DOM element's size
    this._domObj.appendChild(this._threejs.domElement);

    // Inside the ThreeDBasic class, in the _initialize() method
    this._threejs.setClearColor(0xffffff, 1); // White background

    // Set up the camera
    const fov = 40;
    const aspect = rect.width / rect.height; // Aspect ratio based on element size
    const near = 0.1;
    const far = 10000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Create the scene
    this._scene = new THREE.Scene();

    // Backgrond
    if (this._pathToBackground) {
      // Load an image and resize it
      const loader = new THREE.TextureLoader();
      loader.load(this._pathToBackground, (texture) => {
        // Resize the texture if it's not square
        // const size = Math.min(rect.width, rect.height); // Get the smaller dimension for equal width/height

        // Resize the texture (example for a plane geometry)
        texture.image.width = 35;
        texture.image.height = 35;

        texture.generateMipmaps = false; // Disable mipmap generation
        texture.minFilter = THREE.LinearFilter; // Use linear filtering for better performance
        texture.magFilter = THREE.LinearFilter; // Use linear filtering for better performance

        // Update the texture
        texture.needsUpdate = true;

        // Create a plane with the resized texture
        const geometry = new THREE.PlaneGeometry(35, 35);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const plane = new THREE.Mesh(geometry, material);

        this._plane = plane;

        this._plane.rotation.y = Math.PI / 2;
        this._scene.add(this._plane);
      });
    }

    // // Add a Directional Light
    // Add directional light (shines in one direction);

    if (this._lightingArray.length > 0) {
      for (let light of this._lightingArray) {
        this._scene.add(light);
        this._scene.add(light.target);
      }
    }

    // Orbit controls
    // // Set up OrbitControls (interactive camera control)
    this._controls = new OrbitControls(this._camera, this._threejs.domElement);
    this._controls.enableDamping = true; // Smooth damping
    this._controls.dampingFactor = 0.25; // Damping factor (slows down the camera movement)
    this._controls.enableZoom = this._enableZoom; // Allow zooming
    this._controls.enableRotate = this._dragRotateEnabled;

    this._controls.maxDistance =10

    this._camera.position.set(...this._cameraPosition); // Position the camera
    this._controls.update();

    /* Set up  */
    if (this._followMouse) this._setUpMouseFollow();

    this._LoadModel();
    // Call the animation loop
    this._RAF();
  }

  _setUpMouseFollow() {
    this._target = new THREE.Object3D();
    this._target.position.x = this._initialPosition[0];
    this._target.position.y = this._initialPosition[1];
    this._target.position.z = this._initialPosition[2];
    this._intersectionPoint = new THREE.Vector3();
    this._planeNormal = new THREE.Vector3();
    this._intersectionPlane = new THREE.Plane();
    this._raycaster = new THREE.Raycaster();
    // Set up raycasting for mouse tracking
    this._pointer = new THREE.Vector2();

    const onMouseMove = (e) => {
      this._pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      this._pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      this._planeNormal.copy(this._camera.position).normalize();
      this._intersectionPlane.setFromNormalAndCoplanarPoint(
        this._planeNormal,
        this._scene.position
      );
      this._raycaster.setFromCamera(this._pointer, this._camera);
      this._raycaster.ray.intersectPlane(
        this._intersectionPlane,
        this._intersectionPoint
      );
      this._target.position.set(
        this._intersectionPoint.x,
        -this._intersectionPoint.y,
        2
      );
    };

    const onTouchMove = (e) => {
      const touch = e.touches[0];
      this._pointer.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this._pointer.y = (touch.clientY / window.innerHeight) * 2 - 1;
      this._planeNormal.copy(this._camera.position).normalize();
      this._intersectionPlane.setFromNormalAndCoplanarPoint(
        this._planeNormal,
        this._scene.position
      );
      this._raycaster.setFromCamera(this._pointer, this._camera);
      this._raycaster.ray.intersectPlane(
        this._intersectionPlane,
        this._intersectionPoint
      );
      this._target.position.set(
        this._intersectionPoint.x,
        -this._intersectionPoint.y,
        2
      );
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
  }

  _OnWindowResize() {
    // Ensure renderer and camera are updated on window resize
    const rect = this._domObj.getBoundingClientRect();
    this._threejs.setSize(rect.width, rect.height);
    this._camera.aspect = rect.width / rect.height; // Update aspect ratio
    this._camera.updateProjectionMatrix(); // Apply the new aspect ratio
  }

  updateModelPosition(modelPosition) {
    this._model.position.set(...modelPosition);
  }

  updateCameraPosition(cameraPosition) {
    this._camera.position.set(...cameraPosition);
  }

  _LoadModel() {
    const loader: GLTFLoader = new GLTFLoader();
    loader.load(
      this._glbRef,
      (gltf) => {
        this._model = gltf.scene;
        this._model.position.set(...this._modelPosition); // Set the model's position to (0, 0, 0)
        this._model.rotation.set(...this._modelRotation);

        this._model.traverse((c) => {
        
          if (c.isMesh) {
            c.geometry.computeVertexNormals();
            c.castShadow = true; // Mesh casts shadows
            c.receiveShadow = this._modelShadow; // Mesh can receive shadows
          }
        });

        this._scene.add(this._model);

        // DISPATCH LOADED EVENT
        this.dispatchEvent(new CustomEvent("modelloaded"));

        // IF no animations then return
        if (!this._animationList) return;

        this._animations = gltf.animations;
        this._mixer = new THREE.AnimationMixer(this._model);

        //
        setTimeout(() => {
          this.isLoaded = true;
          this.playAnimation(this._playAnimation);
        }, 2000);
      },
      () => {},
      () => {
        // On Error
        this.dispatchEvent(new CustomEvent("modelerror"));
      }
    );
  }

  // Animations
  playAnimation(playAnimation: boolean) {
    if (!this._animations) return;

    const animation = this._animations.find((animation) => {
      if (animation.name === this._defaultAnimationName) return animation;
    });

    const action = this._mixer.clipAction(animation, this._model);

    const animationDetails = Object.values(this._animationList).find(
      (animationDets) => {
        if (animationDets.name === this._defaultAnimationName) return true;

        return false;
      }
    );
    const animationDuration = animationDetails.animationLength;
    const animationStartDelay = animationDetails.startDelay;

    // Initialise animation, tie default animation to camera objec
    if (animationDetails.animation) {
      this._currentCameraMovementPath = animationDetails.animation;

      this._currentCameraMovementPath.initialize(this._controls, this._dragRotateEnabled, this._dragRotateLimit);
    }

    setTimeout(() => {
      action.play();
    }, animationStartDelay);
    if (playAnimation) {
      setTimeout(() => {
        action.paused = true;
      }, animationDuration + animationStartDelay);
    } else {
      action.stop();
      action.reset();
    }
  }

  changeAnimation(animationName: string) {
    if (!this._animations) return;

    const oldAnimation = this._animations.find((animation) => {
      if (animation.name === this._defaultAnimationName) return animation;
    });

    const oldAction = this._mixer.clipAction(oldAnimation, this._model);

    oldAction.stop();
    oldAction.reset();
    oldAction.paused = false;

    // Get glb-stored animation
    const newAnimation = this._animations.find((animation) => {
      if (animation.name === animationName) return animation;
    });
    this._defaultAnimationName = animationName;

    // Configure animation action
    const action = this._mixer.clipAction(newAnimation, this._model);

    // Get animation details from list
    const animationDetails = Object.values(this._animationList).find(
      (animationDets) => {
        if (animationDets.name === this._defaultAnimationName) return true;

        return false;
      }
    );

    const animationDuration = animationDetails.animationLength;
    const animationStartDelay = animationDetails.startDelay;

    action.clampWhenFinished = true;

    // Configure camera animation
    if (animationDetails.animation) {
      this._currentCameraMovementPath = animationDetails.animation;
      this._currentCameraMovementPath.initialize(this._controls, this._dragRotateEnabled, this._dragRotateLimit);
    }

    //Delay animation start
    setTimeout(() => {
      action.play();
    }, animationStartDelay);

    // Pause animation at specified point
    setTimeout(() => {
      action.paused = true;
    }, animationDuration + animationStartDelay);
  }

  _rotateModelToFacePoint() {
    // Get the direction vector from the model to the mouse
    const direction = new THREE.Vector3()
      .subVectors(this._target.position, this._model.position)
      .normalize();

    // Calculate the angle the model needs to rotate to face the mouse
    const angle = Math.atan2(direction.x, direction.z);
    this._model.rotation.y =
      Math.max(Math.min(angle, Math.PI / 12), -Math.PI / 12) +
      this._modelRotation[1];

    const angleX = Math.atan2(
      direction.y,
      Math.sqrt(direction.x * direction.x + direction.z * direction.z)
    );
    this._model.rotation.x = Math.max(
      Math.min(-angleX, Math.PI / 16),
      -Math.PI / 24
    );
  }

  remove() {
    if (this._scene) {
      this._scene = null;
      // Dispose of dom element
      try {
        this._domObj.removeChild(this._domObj.children[0]);
        this._threejs.domElement.innerHTML = "";
        this._threejs.domElement = null;
      } catch (e) {
        console.log(e);
      }

      // Dispose of textures, lights, etc.
      if (this._threejs) {
        this._threejs.dispose();
      }
    }
  }

  _RAF(t: number = 0) {
    requestAnimationFrame((t) => {
      // Rotate the model to face the mouse position
      if (this._model && this._followMouse) {
        this._rotateModelToFacePoint();
      }
      if (this._mixer) {
        this._mixer.update(1 / 60); // Adjust time increment as needed
      }

      //

      // Background plane
      if (this._plane) {
        this._plane.position.set(
          this._camera.position.x * -1,
          -this._camera.position.y,
          this._camera.position.z * -1
        );

        this._plane.lookAt(this._camera.position);

        // this._plane.rotateY(Math.PI/2)
      }

      // Update camera position
      if (this._animationList && this.isLoaded) {
        this._currentCameraMovementPath.update();
      }

      this._controls.update();
      this._threejs.render(this._scene, this._controls.object);
      this._RAF(t);
    });
  }
}

export default ThreeDBasic;
