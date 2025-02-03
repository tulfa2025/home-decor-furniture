"use client";
import scrollTransformValues from "@/utils/scrollTransformValues";
import styles from "./banner.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import { useEffect, useRef, useState } from "react";
import useInView from "@/hooks/use_inview";

const Banner: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {

  const [isLoading, setIsLoading] = useState(false)

  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.25);

  const timeoutRef = useRef(null)

  useEffect(()=>{

    if(isInView){

     

      clearTimeout(timeoutRef.current);

      console.log(timeoutRef)

      timeoutRef.current = setTimeout(()=>{
        setIsLoading(true);
      }, 1000)
    } else {
      clearTimeout(timeoutRef.current);
      
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
      backgroundStyles={{
        backgroundColor: 'transparent'
      }}
      resize={false}
    >
      <div className={styles.int_container}  ref={inViewRef}>
      {isLoading ? <iframe 
        src='https://app.vectary.com/p/20tEclig6faVL7mlvKkfLJ' 
        allow="xr-spatial-tracking"
        height='100%'
        width='100%'
        style={{ border: 'none' }}
        loading="lazy"
      /> : ''}
      </div>
    </LargeSlideContainer>
  );
};

export default Banner;
