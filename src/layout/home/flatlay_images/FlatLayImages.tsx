"use client";
import { inView, motion, useMotionValueEvent, useScroll } from "framer-motion";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import styles from "./FlatLayImages.module.scss";
import Image from "next/image";
/* FLATLAY IMAGES */
import flatlayOneImage from "../../../assets/images/flatlay_images/FlatLay1.jpg";
import flatlayOneMobImage from "../../../assets/images/flatlay_images/FlatLay-mobile-2.webp";
import flatlayTwoImage from "../../../assets/images/flatlay_images/scene1.png";
import { useState, useRef, useEffect, useContext } from "react";

import useInView from "@/hooks/use_inview";
import useWindowSize from "@/hooks/use_window_size";
import DeviceContext from "@/context/deviceContext";

const FlatLayImages: React.FC<LayoutProps> = ({
  layoutName,
  zIndex
}) => {
  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);

  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);

  const changeTrackRef = useRef(null);
  const isTrackInView = useInView(inViewRef, 0.85);

  const viewportSize = useWindowSize()

  useEffect(()=>{
    if(isTrackInView){
      setDirection(1)
    } else {
      setDirection(0)
    }
    }, [isTrackInView])
  
  const deviceContext = useContext(DeviceContext)

  useEffect(()=>{
    return(()=>{

      changeTrackRef.current = null;
      inViewRef.current = null;
      containerRef.current = null

    })
  }, [])


  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Flat Lay Images"
      paragraph="Create mood boards to help interior designers to select elements to enhance their projects."
      zIndex={zIndex}
    >
      <div className={styles.flex_container} ref={containerRef}>
        <motion.div
          className={styles.image_container}
          animate={{
            opacity: direction === 1 ? 0 : 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          ref={inViewRef}
        >
          <Image
            src={viewportSize.height > viewportSize.width ? flatlayOneMobImage : flatlayOneImage }
            alt=""
            className={styles.first_image}
            quality={deviceContext === 'Other' ? 50 : 10}
          />
        </motion.div>
        <motion.div
          className={styles.image_container}
          animate={{
            opacity: direction === 0 ? 0 : 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          ref={changeTrackRef}
        >
          <Image
            src={flatlayTwoImage}
            alt=""
            className={styles.second_image}
            quality={deviceContext === 'Other' ? 50 : 10}
          />
        </motion.div>
      </div>
    </LargeSlideContainer>
  );
};

export default FlatLayImages;
