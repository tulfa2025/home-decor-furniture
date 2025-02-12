"use client";
import styles from "./DimensionImages.module.scss";
import Image from "next/image";

import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import { motion } from "framer-motion";
/* DIMENSION IMAGES */
import { useContext, useRef } from "react";
import DeviceContext from "@/context/deviceContext";
import useInView from "@/hooks/use_inview";

const DimensionImages: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const deviceContext = useContext(DeviceContext);

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.05);
  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Dimension Images"
      paragraph="Give your customers a clear view of how your furniture fits into their space with precise dimensions and scale indicators."
      dynamicHeader={false}
      zIndex={zIndex}
    >
      <div ref={inViewRef} className={styles.inview_trigger}></div>
      {isInView && (
        <motion.div
          className={styles.flex_container}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5
          }}
        >
          <div className={styles.image_container}>
            <Image
              src='/images/dimension_images/Dimension Images 1.webp'
              alt=""
              className={styles.measurement}
              quality={deviceContext === "Other" ? 50 : 10}
              width={3000}
              height={2400}
            />
            
          </div>
          <div className={styles.image_container}>
            <Image
              src='/images/dimension_images/armchair_setting.webp'
              alt=""
              className={styles.setting}
              quality={deviceContext === "Other" ? 50 : 10}
              width={3000}
              height={2400}
            />
          </div>
        </motion.div>
      )}
    </LargeSlideContainer>
  );
};

export default DimensionImages;
