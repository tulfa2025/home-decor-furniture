"use client";
import styles from "./sofa_code.module.scss";
import { useRef, useState, useEffect, useContext } from "react";
import { useScroll, useTransform, motion, useSpring, useMotionValueEvent } from "motion/react";
/* CUSTOM CONTEXT */
import useWindowSize from "@/hooks/use_window_size";
import useInView from "@/hooks/use_inview";
import SlideContext from "@/context/changeSlide";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import SubheaderStyleContext from "@/context/subHeaderStyle";

/* CUSTOM COMPONENT */

import useScrollTransform from "@/hooks/use_scrolltransform";
import scrollTransformValues, { scrollSpringProperties } from "@/utils/scrollTransformValues";
import ThreeDScene from "@/components/3dscene/three_d_scene";


const ThreeDSofa: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  // Get scroll height
  const viewportSize = useWindowSize();

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

  const scrollTargetRef = useRef(null);
  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  /* CHANGE SLIDE CONTEXT */
  const handleChangeSlide = useContext(SlideContext);

  useEffect(() => {
    if (isInView) {
      handleChangeSlide(layoutName);
    }
  }, [isInView]);

  const scrollHeight = calculateScrollHeight(viewportSize.height, 1);

  /* ANIMATION START AND END POSITION */
  const [yPosition, setYPosition] = useState(0);

  // Function to get the Y position of the element
  const getElementYPosition = () => {
    if (scrollTargetRef.current) {
      const yPos = scrollTargetRef.current.offsetTop;
      setYPosition(yPos); // Update state with the Y position
    }
  };

  // Optionally, you can track the position on window resize or scroll
  useEffect(() => {
    // Get initial Y position when component mounts
    getElementYPosition();
  }, [scrollHeight]);

  /* WHOLE PAGE TRANSLATOIN */
  const [input, transform] = useScrollTransform(
    scrollHeight,
    viewportSize,
    yPosition,
    scrollTransformValues.sofaCode
  )
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    input,
    transform
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    scrollSpringProperties
  );

  // Subheadr scroll
  const [headerStyle, setHeaderStyle] = useContext(SubheaderStyleContext);
  /* SET HEADER STYLE AT DIFFERNT INTERVALS */
  useMotionValueEvent(scrollY, "change", (v) => {
    if (isInView) {
      if (v > yPosition) {
        setHeaderStyle(0)
      }
    }
  });

  return (
    <motion.div
      style={{
        height: scrollHeight,
        position: "relative",
        top: 0,
        overflow: "auto",
        zIndex: isInView ? zIndex : -1,
      }}
      ref={scrollTargetRef}
    >
      <motion.div
        style={{
          top: 0,
          position: "fixed",
          height: "100vh",
          width: "100vw",
          y: springyTransformShowcaseAnimationThree,
        }}
        ref={inViewRef}
      >
        {/* CONTENT AQUI */}
        <motion.section className={styles.container}>

          {/* CANVAS HERE */}
          <div
            className={
              styles.canvasContainer
            }
          >
            <ThreeDScene 
              glbRef='glb/Sofa.glb'
            />
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default ThreeDSofa ;
