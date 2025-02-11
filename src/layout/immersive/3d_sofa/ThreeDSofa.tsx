"use client";
import styles from "./sofa_code.module.scss";
import { motion } from "framer-motion";
import ThreeDScene from "@/components/3dscene/three_d_scene";
import { useMemo } from "react";
import useWindowSize from "@/hooks/use_window_size";


const ThreeDSofa: React.FC = () => {

  const viewportSize = useWindowSize()

  const cameraPosition = useMemo(()=>{
    if(viewportSize.width >= 960){
      return [0, 0.5, 2.5]
    } else if (viewportSize.width >= 768){
      return [0, 0.5, 3.5]
    } else {
      return [0, 0.5, 6]
    }
  }, [viewportSize])

  const modelPosition = useMemo(()=>{
    if(viewportSize.width >= 960){
      return [0, -0.5, 0]
    } else if (viewportSize.width >= 768){
      return [0, -0.5, 0]
    } else {
      return [0, -0.5, 0]
    }
  }, [viewportSize])

  return (
    <>
      {/* CONTENT AQUI */}

      <div className={styles.canvasContainer}>
        <ThreeDScene
          glbRef="glb/Sofa.glb"
          followMouse={true}
          cameraPosition={cameraPosition}
          modelPosition={modelPosition}
          blurSrc='/glb/blur/Sofa_blur.png'
        />
      </div>
    </>
  );
};

export default ThreeDSofa;
