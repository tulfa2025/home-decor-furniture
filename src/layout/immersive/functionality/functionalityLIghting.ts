import * as THREE from "three";

// FRONTAL
const lightOne = new THREE.DirectionalLight(0xffffff, 2);
lightOne.position.set(-2, -0.7, 5).normalize();
lightOne.target.position.set(0, 0.5, 0);
lightOne.castShadow = true;
lightOne.shadow.mapSize.width =4000;
lightOne.shadow.mapSize.height =4000

//Lampside down
const lightThree = new THREE.DirectionalLight(0xffffff, 2.7);
lightThree.position.set(0.7, 3, 0).normalize();
lightThree.target.position.set(-0.15, 0, 0);
lightThree.castShadow = true;
lightThree.shadow.mapSize.width = 4000;
lightThree.shadow.mapSize.height = 4000
lightThree.shadow.bias = 0.000001


// Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xfeffff, 0.7); // Soft white light


const lightingArray = [
   
    lightOne,
    lightThree,
    ambientLight,

];

export default lightingArray;
