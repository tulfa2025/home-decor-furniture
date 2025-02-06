"use client";
import styles from "./sofa_code.module.scss";
import {motion} from 'framer-motion'
import ThreeDScene from "@/components/3dscene/three_d_scene";

const ThreeDSofa: React.FC = () => {
  return (
    <>
      {/* CONTENT AQUI */}
     
        <div className={styles.canvasContainer}>
          <ThreeDScene glbRef="glb/Sofa.glb" />
        </div>
      
    </>
  );
};

export default ThreeDSofa;
