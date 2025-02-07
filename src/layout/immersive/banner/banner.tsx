"use client";
import scrollTransformValues from "@/utils/scrollTransformValues";
import styles from "./banner.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import { useEffect, useRef, useState, useContext } from "react";
import useInView from "@/hooks/use_inview";

import DeviceContext from "@/context/deviceContext";
import ThreeDScene from "@/components/3dscene/three_d_scene";

const Banner: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {

  const [isLoading, setIsLoading] = useState(false)

  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.25);

  const timeoutRef = useRef(null);

  const deviceContext = useContext(DeviceContext)

  useEffect(()=>{

    if(isInView){

      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(()=>{
        setIsLoading(true);
      }, 500)
    } else {
      clearTimeout(timeoutRef.current);

      if(deviceContext !== 'Other'){
        setIsLoading(false)
      }
      
    }
  }, [isInView])
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
      <div className={styles.int_container}  ref={inViewRef}>
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
              cameraPosition={
                [0,0,4]
              }
              modelRotation={[
               0,
                -Math.PI / 2,
                0
              ]}
              initialPosition={[
                0,0,2
              ]}
            />
          
      </div>
    </LargeSlideContainer>
  );
};

export default Banner;
