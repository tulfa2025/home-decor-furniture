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

  const [isVisible, setIsVisible] = useState(false)

  const timeoutRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // `entry` is the intersection observer entry
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(()=>{
          setIsVisible(entry.isIntersecting); // true if the element is in view
        observer.unobserve(canvasRef.current)
        }, 1250)
      },
      {
        root: null, // null means the viewport
        rootMargin: '0px', // margin around the root
        threshold: 0.5, // percentage of the element that should be in view
      }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // SET UP
    if (canvasRef.current && !threedScene.current && isVisible) {
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
  }, [isVisible]);


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
