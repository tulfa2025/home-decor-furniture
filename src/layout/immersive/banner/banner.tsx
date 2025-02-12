"use client";
import scrollTransformValues from "@/utils/scrollTransformValues";
import styles from "./banner.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import { useRef } from "react";

import ThreeDScene from "@/components/3dscene/three_d_scene";
import lightingArray from "./bannerLighting";

const Banner: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const inViewRef = useRef(null);

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
      <div className={styles.int_container} ref={inViewRef}>
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
      </div>
    </LargeSlideContainer>
  );
};

export default Banner;
