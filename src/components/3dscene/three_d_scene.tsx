import { useEffect, useRef, useState } from "react";
import ThreeDBasic from "./ThreeObject";
import useInView from "@/hooks/use_inview";

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
  enableZoom,
  pathToBackground
}) => {
  const canvasRef = useRef(null);

  const threedScene = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  const isInView = useInView(canvasRef, 0.2);

  const timeoutRef = useRef(null);

  useEffect(() => {
    // SET UP
    clearTimeout(timeoutRef.current);
    if (canvasRef.current && !threedScene.current && isInView) {
      

      timeoutRef.current = setTimeout(() => {
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
          enableZoom,
          pathToBackground
        );
      }, 1250);
    }
  }, [isInView]);

  // Change Animation
  useEffect(() => {
    if (threedScene.current) {
      threedScene.current.changeAnimation(defaultAnimationName);
    }
  }, [defaultAnimationName]);

  // Pause and play
  useEffect(() => {
    if (threedScene.current) {
      threedScene.current.playAnimation(playAnimation);
    }
  }, [playAnimation]);

  const timeoutRefPos = useRef(null)
  // Update model and camera position on change
  useEffect(()=>{

    clearTimeout(timeoutRefPos.current)

    setTimeout(()=>{
      if (threedScene.current) {
        threedScene.current.updateModelPosition(modelPosition);
        threedScene.current.updateCameraPosition(cameraPosition);
      }
    }, 1000)
    
  }, [cameraPosition, modelPosition])

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        pointerEvents: "auto",
      }}
      ref={canvasRef}
    />
  );
};

export default ThreeDScene;
