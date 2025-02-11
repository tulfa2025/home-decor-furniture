import { useCallback, useEffect, useRef, useState } from "react";
import ThreeDBasic from "./ThreeObject";
import useInView from "@/hooks/use_inview";
import Image from "next/image";
import styles from "./three_d_scene.module.scss";
import { usePathname } from "next/navigation";

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
  pathToBackground,
  blurSrc = "",
}) => {
  const canvasRef = useRef(null);
  const inViewRef = useRef(null);

  const threedScene = useRef(null);

  const isInView = useInView(inViewRef, 0.05);

  const timeoutRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, [blurSrc]);

  // SETUP SCENE AND LOAD MODEL
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
        threedScene.current.addEventListener("modelloaded", onLoad);
      }, 1250);
    }
  }, [isInView]);

  // remove model from view whe leaves scene + clean up
  const removeModelRef = useRef(null);
  useEffect(() => {
    clearTimeout(removeModelRef.current);
    if (!threedScene.current) {
    } else if (!isInView && threedScene.current.isLoaded) {
      removeModelRef.current = setTimeout(() => {
        setIsLoaded(false);
        threedScene.current.removeEventListener("modelloaded", onLoad);
        threedScene.current.remove();
        threedScene.current = null;
        canvasRef.current.innerHTML = "";
      }, 2000);
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

  const timeoutRefPos = useRef(null);
  // Update model and camera position on change
  useEffect(() => {
    clearTimeout(timeoutRefPos.current);

    setTimeout(() => {
      if (threedScene.current) {
        threedScene.current.updateModelPosition(modelPosition);
        threedScene.current.updateCameraPosition(cameraPosition);
      }
    }, 1000);
  }, [cameraPosition, modelPosition]);

  // Remove when navigated away
  const pathname = usePathname();
  useEffect(() => {
    return () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
    };
  }, [pathname]);

  // Handling resize events listeners
  useEffect(() => {
    const handleResize = () => {
      threedScene.current._OnWindowResize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };
  }, []);

  // Handling assets
  useEffect(() => {
    return () => {
      if (threedScene.current) {
        threedScene.current.removeEventListener("modelloaded", onLoad);
        threedScene.current.remove();
        threedScene.current = null;
      }
    };
  }, []);

  
  return (
    <>
      {/* in view container */}
      <div className={styles.in_view_container} ref={inViewRef}></div>
      {/* LOADING PLACEHOLDER HERE */}
      {!isLoaded && (
        <div className={styles.loading_placeholder}>
          <Image
            src={blurSrc}
            alt=""
            height={700}
            width={700}
            priority
            className={styles.image_container}
          />
          <h4 className={styles.notification}>Loading 3D Model</h4>

          <div className={styles.loading_bar}></div>
        </div>
      )}

      {/** */}
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          pointerEvents: "auto",
        }}
        ref={canvasRef}
      ></div>
    </>
  );
};

export default ThreeDScene;
