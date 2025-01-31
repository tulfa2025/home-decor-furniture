"use client";
import styles from "./functionality.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import scrollTransformValues from "@/utils/scrollTransformValues";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useMemo, useState } from "react";

const Functionality: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const [buttonSelection, setButtonSelection] = useState(1);

  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Functionality"
      paragraph="Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis tristique amet. Elementum laoreet aenean quam phasellus imperdiet. "
      dynamicHeader={false}
      bannerType="default"
      zIndex={zIndex}
      scrollMap={scrollTransformValues.functionality}
      resize={false}
    >
      {/* FUNCTIONALITY CAROUSEL  */}
      <div className={styles.int_container}>
        <div className={styles.videos_container}>
          <FunctionalityVideoContainer
            src="Animation_1_compressed.mp4"
            isPlaying={buttonSelection === 1}
          />
          <FunctionalityVideoContainer
            src="Animation_2_compressed.mp4"
            isPlaying={buttonSelection === 2}
          />
          <FunctionalityVideoContainer
            src="Animation_3_compressed.mp4"
            isPlaying={buttonSelection === 3}
          />
          <FunctionalityVideoContainer
            src="Animation_4_compressed.mp4"
            isPlaying={buttonSelection === 4}
          />
          <FunctionalityVideoContainer
            src="Animation_5_compressed.mp4"
            isPlaying={buttonSelection === 5}
          />
        </div>

        <div className={styles.video_options_container}>
          <div className={styles.video_buttons_container}>
            {/* SLIDER */}
            <div
              className={styles.slider_container}
            >
              <motion.div
                className={styles.slider}
                initial={{
                  left:0
                }}
                animate={{
                  left: `${20 * (buttonSelection-1)}%`
                }}
                transition={{
                  type: 'spring',
                  damping: 20,
                  stiffness: 150
                }}
              >

              </motion.div>

            </div>

            {/* BUTTONS */}
            <motion.button
              className={`${styles.button_style_default} ${
                buttonSelection === 1 ? styles.active : ""
              }`}
              onClick={() => {
                setButtonSelection(1);
              }}
            >
              Horizontal Drawer
            </motion.button>
            <motion.button
              className={`${styles.button_style_default} ${
                buttonSelection === 2 ?  styles.active : ""
              }`}
              onClick={() => {
                setButtonSelection(2);
              }}
            >
              Front and Back Drawer
            </motion.button>
            <motion.button
              className={`${styles.button_style_default} ${
                buttonSelection === 3 ?  styles.active : ""
              }`}
              onClick={() => {
                setButtonSelection(3);
              }}
            >
              Hidden Table Top
            </motion.button>
            <motion.button
              className={`${styles.button_style_default} ${
                buttonSelection === 4 ?  styles.active : ""
              }`}
              onClick={() => {
                setButtonSelection(4);
              }}
            >
              Button and Robotic Arm
            </motion.button>
            <motion.button
              className={`${styles.button_style_default} ${
                buttonSelection === 5 ?  styles.active : ""
              }`}
              onClick={() => {
                setButtonSelection(5);
              }}
            >
              Under-glow Light
            </motion.button>
          </div>
          <div className={styles.video_description_container}>
            Display every key function your furniture offers—openings, folds,
            expansions, adjustments, and rotations—with clarity and precision.
          </div>
        </div>
      </div>
    </LargeSlideContainer>
  );
};

const FunctionalityVideoContainer = ({ src, isPlaying }) => {
  const isVisibleNow = useMemo(() => {
    return isPlaying;
  }, [isPlaying]);

  // Create a reference to the video element
  const videoRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (videoRef.current && isVisibleNow) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load(); // Apparently resets buffer
    }
  }, [isVisibleNow, src]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.load(); // Apparently resets buffer
        videoRef.current.remove();
      }
    };
  }, [pathname]);

  return (
    <motion.video
      muted
      preload="metadata"
      loop={true}
      playsInline
      ref={videoRef}
      style={{
        opacity: isVisibleNow ? 1 : 0,
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        objectFit: "contain",
        zIndex: -1,
      }}
    >
      <source src={`videos/immersive/${src}`} type="video/mp4" />
      Your browser does not support the video tag.
    </motion.video>
  );
};

export default Functionality;
