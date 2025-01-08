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

  const changeImage = (e) => {
    if (!isInView) return;
    // For touch events or wheel events, check the deltaY or y position
    if (e instanceof WheelEvent) {
      // For wheel events, deltaY will indicate scroll direction
      if (e.deltaY > 0) {
        setDirection(1); // Scroll down
      } else {
        setDirection(0); // Scroll up
      }
    } else if (e instanceof TouchEvent) {
      // For touch events (e.g., touchmove), check the vertical movement
      if (e.touches[0].clientY < e.changedTouches[0].clientY) {
        setDirection(0); // Scroll up
      } else {
        setDirection(1); // Scroll down
      }
    }
  };

  useEffect(() => {
    containerRef.current.removeEventListener("wheel", changeImage);
    containerRef.current.removeEventListener("touchmove", changeImage);
    // Attach the event listener
    containerRef.current.addEventListener("wheel", changeImage, { passive: true }); // For mouse wheel scroll
    containerRef.current.addEventListener("touchmove", changeImage, { passive: true }); // For touch scrolling

    // Cleanup the event listener
    return () => {
      containerRef.current.removeEventListener("wheel", changeImage);
      containerRef.current.removeEventListener("touchmove", changeImage);
    };
  }, [isInView]);

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
            className={styles.dimension_image}
            style={{
              objectPosition: "75% 50%",
            }}
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
        >
          <Image
            src={flatlayTwoImage}
            alt=""
            className={styles.dimension_image}
          />
        </motion.div>
      </div>
    </LargeSlideContainer>
  );
};

export default FlatLayImages;
