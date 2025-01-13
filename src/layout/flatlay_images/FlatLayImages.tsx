"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import styles from "./FlatLayImages.module.scss";
import Image from "next/image";
/* FLATLAY IMAGES */
import flatlayOneImage from "../../assets/images/flatlay_images/FlatLay1.jpg";
import flatlayTwoImage from "../../assets/images/flatlay_images/scene1.png";
import { useState, useRef, useEffect } from "react";

import useInView from "@/hooks/use_inview";

const FlatLayImages: React.FC<LayoutProps> = ({
  layoutName,
  handleLayoutLoad,
  handleChangeSlide,
  zIndex
}) => {
  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);

  const changeTrackRef = useRef(null);
  const isTrackInView = useInView(inViewRef, 0.85);

  useEffect(()=>{
    if(isTrackInView){
      setDirection(1)
    } else {
      setDirection(0)
    }
    
  }, [isTrackInView])


  return (
    <LargeSlideContainer
      layoutName={layoutName}
      handleChangeSlide={handleChangeSlide}
      handleLayoutLoad={handleLayoutLoad}
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
            src={flatlayOneImage}
            alt=""
            className={styles.first_image}
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
          />
        </motion.div>
      </div>
    </LargeSlideContainer>
  );
};

export default FlatLayImages;
