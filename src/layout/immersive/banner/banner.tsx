"use client";
import scrollTransformValues from "@/utils/scrollTransformValues";
import styles from "./banner.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";

import ThreeDScene from "@/components/3dscene/three_d_scene";
import lightingArray from "./bannerLighting";

import { motion } from "framer-motion";

const Banner: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Immersive Experience"
      paragraph="Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis tristique amet. Elementum laoreet aenean quam phasellus imperdiet. "
      dynamicHeader={false}
      bannerType="main-ie"
      zIndex={zIndex}
      scrollMap={scrollTransformValues.immersive}
      resize={false}
    >
      <motion.div
        className={styles.int_container}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
          transition: {
            delay: 1,
            duration: 0.5,
          },
        }}
      >
        <ThreeDScene
          glbRef="glb/Immersive_AR.glb"
          followMouse={true}
          cameraPosition={[0, 0, 2.5]}
          modelRotation={[0, -Math.PI / 2, 0]}
          initialPosition={[0, 0, 2]}
          modelPosition={[0, -0.5, 0]}
          blurSrc="/glb/blur/blur-image-banner.webp"
          lightingArray={lightingArray}
        />
      </motion.div>
    </LargeSlideContainer>
  );
};

export default Banner;
