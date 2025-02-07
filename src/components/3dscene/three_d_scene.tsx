import { useEffect, useRef, useState } from "react";
import ThreeDBasic from "./ThreeObject";

const ThreeDScene = ({
  glbRef,
  followMouse = false,
  cameraPosition,
  modelPosition,
  modelRotation,
  initialPosition,
  animationNames,
  playAnimation,
  defaultAnimationName,
  enableRotateMouse,
  enableZoom
}) => {
  const canvasRef = useRef(null);

  const threedScene = useRef(null);


  useEffect(() => {
    // SET UP
    if (canvasRef.current && !threedScene.current) {
      threedScene.current = new ThreeDBasic(
        canvasRef.current,
        glbRef,
        followMouse,
        cameraPosition,
        modelPosition,
        modelRotation,
        initialPosition,
        playAnimation,
        animationNames,
        defaultAnimationName,
        enableRotateMouse,
        enableZoom
      );
    }
  }, []);


  // Change Animation
  useEffect(()=>{

    if(threedScene.current){
      threedScene.current.changeAnimation(defaultAnimationName)
    }
  }, [defaultAnimationName])

  // Pause and play
  useEffect(()=>{

    if(threedScene.current){
      threedScene.current.playAnimation(playAnimation)
    }

  }, [playAnimation])

  return (
    <div
      style={{
        height: "110%",
        width: "110%",
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'auto'
      }}
      ref={canvasRef}
    />
  );
};

export default ThreeDScene;
