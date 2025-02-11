"use client";
import scrollTransformValues from "@/utils/scrollTransformValues";
import styles from "./banner.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import { useRef} from "react";

import ThreeDScene from "@/components/3dscene/three_d_scene";

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
        {/* {isLoading ? <iframe 
        src='https://app.vectary.com/p/20tEclig6faVL7mlvKkfLJ' 
        allow="xr-spatial-tracking"
        height='100%'
        width='100%'
        style={{ border: 'none' }}
        loading="lazy"
      /> : ''} */}
      
          <ThreeDScene
            glbRef="glb/Immersive_AR.glb"
            followMouse={true}
            cameraPosition={[0, 0, 2.5]}
            modelRotation={[0, -Math.PI / 2, 0]}
            initialPosition={[0, 0, 2]}
            modelPosition={[0, -0.5, 0]}
            blurSrc="/glb/blur/Immersive_blur.png"
          />
   
      </div>
    </LargeSlideContainer>
  );
};

export default Banner;
