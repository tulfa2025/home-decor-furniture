"use client";
import {  motion  } from "framer-motion";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import styles from "./FlatLayImages.module.scss";
import Image from "next/image";
/* FLATLAY IMAGES */
import { useState, useRef, useEffect, useContext } from "react";

import useInView from "@/hooks/use_inview";
import useWindowSize from "@/hooks/use_window_size";
import DeviceContext from "@/context/deviceContext";

const FlatLayImages: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);

  const containerRef = useRef(null);
;
  const isTrackInView = useInView(inViewRef, 0.85);

  const isInView = useInView(inViewRef, 0.05);

  const viewportSize = useWindowSize();


  const deviceContext = useContext(DeviceContext);

  const quality = deviceContext === "Other" ? 50 : 10;

  useEffect(() => {
    return () => {
      inViewRef.current = null;
      containerRef.current = null;
    };
  }, []);

  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Flat Lay Images"
      paragraph="Create mood boards to help interior designers to select elements to enhance their projects."
      zIndex={zIndex}
    >
      <div ref={inViewRef} className={styles.inview_trigger}></div>
      {isInView && (
        <motion.div
          className={styles.flex_container}
          ref={containerRef}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          <motion.div
            className={styles.image_container}
            animate={{
              opacity: isTrackInView ? 0 : 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
          >
            <Image
              src={
                viewportSize.height > viewportSize.width
                  ? '/images/flatlay_images/FlatLay-mobile-2.webp'
                  : '/images/flatlay_images/FlatLay1.jpg'
              }
              alt=""
              className={styles.first_image}
              quality={deviceContext === "Other" ? 50 : 10}
              height={2400}
              width={3000}
            />
          </motion.div>
          <motion.div
            className={styles.image_container}
            animate={{
              opacity: isTrackInView ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
          >
            <Image
              src='/images/flatlay_images/scene1.png'
              alt=""
              className={styles.second_image}
              quality={quality}
              height={2400}
              width={3000}
            />
          </motion.div>
        </motion.div>
      )}
    </LargeSlideContainer>
  );
};

export default FlatLayImages;
