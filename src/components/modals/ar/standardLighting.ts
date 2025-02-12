import * as THREE from "three";
// Left to right 
const lightOne = new THREE.DirectionalLight(0xffffff, 2);
lightOne.position.set(5, 2, 0).normalize();
lightOne.target.position.set(0, 0, 0);
lightOne.castShadow = true; 

const lightTwo = new THREE.DirectionalLight(0xffffff, 2);
lightTwo.position.set(-5, 2, 0).normalize();
lightTwo.target.position.set(0, 0, 0);
lightTwo.castShadow = true; 

const pointLightOne = new THREE.PointLight( 0xF2E1C1, 75, 100 );
pointLightOne.position.set( 0, 5, -2 );
pointLightOne.castShadow = true

const pointLightTwo = new THREE.PointLight( 0xF2E1C1, 75, 100 );
pointLightTwo.position.set( 0, -2, 5 );
pointLightTwo.castShadow = true

// Add Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light


const lightingArray = [
    ambientLight,
    pointLightOne,
    pointLightTwo

];

export default lightingArray;
