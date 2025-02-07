"use client";
import styles from "./sofa_code.module.scss";
import { motion } from "framer-motion";
import ThreeDScene from "@/components/3dscene/three_d_scene";
import { useContext } from "react";
import DeviceContext from "@/context/deviceContext";

const ThreeDSofa: React.FC = () => {
  const deviceContext = useContext(DeviceContext);
  return (
    <>
      {/* CONTENT AQUI */}

      <div className={styles.canvasContainer}>
        <ThreeDScene
          glbRef="glb/Sofa.glb"
          followMouse={true}
          cameraPosition={deviceContext !== "Other" ? [0, 2, 6] : [0, 2, 3]}
          // modelPosition={[0, -1, 0]}
        />
      </div>
    </>
  );
};

export default ThreeDSofa;
