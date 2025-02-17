import * as THREE from "three";

// FRONTAL
const lightOne = new THREE.DirectionalLight(0xffffff, 1);
lightOne.position.set(-2, 0, 5).normalize();
lightOne.target.position.set(0, 0, 0);
lightOne.castShadow = true;
lightOne.shadow.mapSize.width = 1024;
lightOne.shadow.mapSize.height = 1024

// BACK
const lightTwo = new THREE.DirectionalLight(0xffffff, 0.5);
lightTwo.position.set(0, 0, -5).normalize();
lightTwo.target.position.set(0, 0, 0);
lightTwo.castShadow = true;
lightTwo.shadow.mapSize.width = 1024;
lightTwo.shadow.mapSize.height = 1024


//Lampside down
const lightThree = new THREE.DirectionalLight(0xffffff, 0.5);
lightThree.position.set(4, 2, 0).normalize();
lightThree.target.position.set(-1, 0, 0);
lightThree.castShadow = true;
lightThree.shadow.mapSize.width = 1024;
lightThree.shadow.mapSize.height = 1024

// UNderneath
const pointLight = new THREE.PointLight(0xffffff, 5, 100, 1); // White point light with intensity 1
pointLight.position.set(-5, 5, 1); // Position the point light
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
