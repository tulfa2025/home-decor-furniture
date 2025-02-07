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
          enableZoom
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

  return (
    <div
      style={{
        height: "110%",
        width: "110%",
        display: "flex",
        alignItems: "center",
        pointerEvents: "auto",
      }}
      ref={canvasRef}
    />
  );
};

export default ThreeDScene;
