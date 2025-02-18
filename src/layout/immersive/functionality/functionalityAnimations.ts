/* Animations */
import * as THREE from "three";
import MovementPath from "@/components/3dscene/AnimationHelper";

//Outer body animations
const outBodyCurve = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(0, 1, 2.2),
  new THREE.Vector3(0, 0, 1.7),
  new THREE.Vector3(0.2, 0.5, 1.2)
);
const outerBodyPathObject: PathObject = {
  name: "Outer Body",
  delay: 0,
  duration: 1500,
  path: outBodyCurve,
  lookAtPosition: new THREE.Vector3(0, 0, 0),
};

const outerBodyAnimation = new MovementPath(
  "Outer Body",
  null,
  [outerBodyPathObject],
  {
    toStartOnEnd: false,
  }
);

// Side Drawer Animation
const sideDrawerCurveOne = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(0, 1, 2.2),
  new THREE.Vector3(3, 1, 1.2),
  new THREE.Vector3(2, 1.5, 0.8)
);
const sideDrawerCurveOnePathObject: PathObject = {
  name: "Outer Body",
  delay: 0,
  duration: 2500,
  path: sideDrawerCurveOne,
  lookAtPosition: new THREE.Vector3(0, 0, 0),
};

const sideDrawerCurveTwo = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(2, 1.5, 0.8),
  new THREE.Vector3(2.5, 1.5, 1.2),
  new THREE.Vector3(2.1, 1.7, 0)
);
const sideDrawerCurveTwoPathObject: PathObject = {
  name: "Outer Body",
  delay: 1000,
  duration: 1500,
  path: sideDrawerCurveTwo,
};

const sideDrawerAnimation = new MovementPath(
  "Side Drawer",
  null,
  [sideDrawerCurveOnePathObject, sideDrawerCurveTwoPathObject],
  {
    toStartOnEnd: false,
  }
);

// Inside  Drawer
const insideDrawerCurveOne = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(0, 1, 2.2),
  new THREE.Vector3(0.7, 0.8, 3),
  new THREE.Vector3(1, 0.7, 0.9)
);
const insideDrawerCurveOnePathObject: PathObject = {
  name: "Inside Drawer",
  delay: 0,
  duration: 3000,
  path: insideDrawerCurveOne,
  lookAtPosition: new THREE.Vector3(0, 0.5, 0),
};

const insideDrawerCurveTwo = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(1, 0.7, 0.9),
  new THREE.Vector3(1.4, 1, 1.1),
  new THREE.Vector3(1.5, 1, 1.2)
);
const insideDrawerCurveTwoPathObject: PathObject = {
  name: "Inside Drawer",
  delay: 750,
  duration: 1500,
  path: insideDrawerCurveTwo,
};

const insideDrawerCurveThree = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(1.5, 1, 1.2),
  new THREE.Vector3(2.5, 1.15, 1.2),
  new THREE.Vector3(2, 1, 0)
);
const insideDrawerCurveThreePathObject: PathObject = {
  name: "Inside Drawer",
  delay: 1000,
  duration: 1500,
  path: insideDrawerCurveThree,
};

const insideDrawerAnimation = new MovementPath(
  "Inside Drawer",
  null,
  [
    insideDrawerCurveOnePathObject,
    insideDrawerCurveTwoPathObject,
    insideDrawerCurveThreePathObject,
  ],
  {
    toStartOnEnd: false,
  }
);

// Lamp
const lampCurveOne = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(0, 1, 2.2),
  new THREE.Vector3(1.4, 0.75, 1.1),
  new THREE.Vector3(1.2, 0.6, 0)
);
const lampCurveOnePathObject: PathObject = {
  name: "Lamp",
  delay: 0,
  duration: 2000,
  path: lampCurveOne,
  lookAtPosition: new THREE.Vector3(0, 0, 0),
};

const lampCurveTwo = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(1.2, 0.6, 0),
  new THREE.Vector3(1, 0.6, 0.25),
  new THREE.Vector3(1.1, 0.7, 0.5)
);
const lampCurveTwoPathObject: PathObject = {
  name: "Lamp",
  delay: 2000,
  duration: 2000,
  path: lampCurveTwo,
};

const lampCurveThree = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(1.1, 0.7, 0.5),
  new THREE.Vector3(2.5, 0.7, 1.2),
  new THREE.Vector3(0.6, 0.7, 0.9)
);
const lampCurveThreePathObject: PathObject = {
  name: "Lamp",
  delay: 1000,
  duration: 2500,
  path: lampCurveThree,
  lookAtPosition: new THREE.Vector3(0.55, 0.35, 0.25),
};

const lampAnimation = new MovementPath(
  "Lamp",
  null,
  [lampCurveOnePathObject, lampCurveTwoPathObject, lampCurveThreePathObject],
  {
    toStartOnEnd: false,
  }
);

export {
  outerBodyAnimation,
  sideDrawerAnimation,
  insideDrawerAnimation,
  lampAnimation,
};
