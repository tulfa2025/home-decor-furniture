import * as THREE from "three";

// Left to right 
const lightTwo = new THREE.DirectionalLight(0xffffff, 2.5);
lightTwo.position.set(-5, 0, 0).normalize();
lightTwo.target.position.set(0, 0, 0);
lightTwo.shadow.bias = 0.01;
lightTwo.shadow.mapSize.width = 2048;
lightTwo.shadow.mapSize.height = 2048;
lightTwo.shadow.camera.near = 1.0;
lightTwo.shadow.camera.far = 1000;
lightTwo.shadow.left = 10;
lightTwo.shadow.right = -10;
lightTwo.shadow.top = 10;
lightTwo.shadow.bottom = -10;

// Left to right 
const lightOne = new THREE.DirectionalLight(0xffffff, 2.5);
lightOne.position.set(5, 0, 0).normalize();
lightOne.target.position.set(0, 0, 0);
lightOne.shadow.bias = 0.01;
lightOne.shadow.mapSize.width = 2048;
lightOne.shadow.mapSize.height = 2048;
lightOne.shadow.camera.near = 1.0;
lightOne.shadow.camera.far = 1000;
lightOne.shadow.left = 10;
lightOne.shadow.right = -10;
lightOne.shadow.top = 10;
lightOne.shadow.bottom = -10;

// Facing chair 
const lightThree = new THREE.DirectionalLight(0xffffff, 2.5);
lightThree.position.set(-2, 2, 2).normalize();
lightThree.target.position.set(0, 0, 0);
lightThree.shadow.bias = 0.01;
lightThree.shadow.mapSize.width = 2048;
lightThree.shadow.mapSize.height = 2048;
lightThree.shadow.camera.near = 1.0;
lightThree.shadow.camera.far = 1000;
lightThree.shadow.left = 10;
lightThree.shadow.right = -10;
lightThree.shadow.top = 10;
lightThree.shadow.bottom = -10;


// From underneath
const pointLight = new THREE.PointLight(0xffffff, 5, 100, 1); // White point light with intensity 1
pointLight.position.set(0, -0.2, 3); // Position the point light


// Over the top
const pointLightTwo = new THREE.PointLight(0xffffff, 1, 100, 2); // White point light with intensity 1
pointLightTwo.position.set(-2, 2, 2); // Position the point light


// Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light


const lightingArray = [
    lightOne,
    lightTwo,
    ambientLight,
    pointLight,
    pointLightTwo

];

export default lightingArray;
