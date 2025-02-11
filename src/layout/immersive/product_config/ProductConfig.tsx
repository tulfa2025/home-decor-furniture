"use client";
import scrollTransformValues from "@/utils/scrollTransformValues";
import styles from "./config.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import useInView from "@/hooks/use_inview";
import { useRef, useState, useEffect, useContext } from "react";
import DeviceContext from "@/context/deviceContext";

const ProductConfig: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {

  const [isLoading, setIsLoading] = useState(false)

  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.5);

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

      
        setIsLoading(false)   
      
    }
  }, [isInView])

  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Product Configurator"
      paragraph="Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis tristique amet. Elementum laoreet aenean quam phasellus imperdiet. "
      dynamicHeader={false}
      bannerType="default"
      zIndex={zIndex}
      scrollMap={scrollTransformValues.productConfig}
      resize={false}
    >
      <div className={styles.int_container} ref={inViewRef}>
        { isLoading ? <iframe 
          src='https://xr.tulfa.com/p/7Zq7XSsg4sar6DGVoME6Tp/' 
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

export default ProductConfig;
