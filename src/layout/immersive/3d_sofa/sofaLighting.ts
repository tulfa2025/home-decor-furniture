import * as THREE from "three";

// FRONTAL
const lightOne = new THREE.DirectionalLight(0xffffff, 1);
lightOne.position.set(-2, 0, 4).normalize();
lightOne.target.position.set(0, 0, 0);
lightOne.castShadow = true;

// BACK
const lightTwo = new THREE.DirectionalLight(0xffffff, 1);
lightTwo.position.set(0, 2, -3).normalize();
lightTwo.target.position.set(0, 0, 0);
lightTwo.castShadow = true;

// RIGHT
const lightThree = new THREE.DirectionalLight(0xffffff, 1);
lightThree.position.set(2, 0, 4).normalize();
lightThree.target.position.set(0, 0, 0);
lightThree.castShadow = true;

// UNderneath
const pointLight = new THREE.PointLight(0xffffff, 5, 100, 1); // White point light with intensity 1
pointLight.position.set(0, 5, 7); // Position the point light
pointLight.castShadow = true


// Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xfeffff, 2); // Soft white light


const lightingArray = [
   
    pointLight,
    lightOne,
    lightTwo,
    lightThree,
    ambientLight,

];

export default lightingArray;
