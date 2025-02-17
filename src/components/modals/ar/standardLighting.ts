import * as THREE from "three";
// Left to right 
const lightOne = new THREE.DirectionalLight(0xffffff, 2);
lightOne.position.set(5, 2, 0).normalize();
lightOne.target.position.set(0, 0, 0);
lightOne.castShadow = false; 
lightOne.shadow.mapSize.width = 4000;
lightOne.shadow.mapSize.height = 4000;
lightOne.shadow.bias = 0
lightOne.shadow.radius = 0.5

const lightTwo = new THREE.DirectionalLight(0xffffff, 2);
lightTwo.position.set(-5, 2, 0).normalize();
lightTwo.target.position.set(0, 0, 0);
lightTwo.castShadow = false; 
lightTwo.shadow.mapSize.width = 4000;
lightTwo.shadow.mapSize.height = 4000;
lightTwo.shadow.bias = 0
lightTwo.shadow.radius = 0.5

const pointLightOne = new THREE.PointLight( 0xF2E1C1, 75, 100 );
pointLightOne.position.set( 0, 5, -2 );
pointLightOne.castShadow = true;
pointLightOne.shadow.mapSize.width = 4000;
pointLightOne.shadow.mapSize.height = 4000;
pointLightOne.shadow.bias = 0
pointLightOne.shadow.radius = 0.5

const pointLightTwo = new THREE.PointLight( 0xF2E1C1, 75, 100 );
pointLightTwo.position.set( 0, -2, 5 );
pointLightTwo.castShadow = true;
pointLightTwo.shadow.mapSize.width = 4000;
pointLightTwo.shadow.mapSize.height = 4000;
pointLightTwo.shadow.bias = 0
pointLightTwo.shadow.radius = 0.5

// Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light


const lightingArray = [
    ambientLight,
    pointLightOne,
    pointLightTwo

];

export default lightingArray;
