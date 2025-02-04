"use client";
import { useRef, useState, useEffect, useContext } from "react";
import { useScroll, useTransform, useSpring, motion } from "motion/react";
import styles from "./MiscTemplate.module.scss";
/* CUSTOM COMPONENTS */

/* CUSTOM HOOKS */
import useWindowSize from "@/hooks/use_window_size";
import useInView from "@/hooks/use_inview";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
/* CONTEXT */
import SlideContext from "@/context/changeSlide";
import SubheaderStyleContext from "@/context/subHeaderStyle";


import CallOut from "../../call_out/CallOut";
import Button from "../../button/Button";
import useScrollTransform from "@/hooks/use_scrolltransform";
import scrollTransformValues, { scrollSpringProperties } from "@/utils/scrollTransformValues";

const MiscDemoTemplate = ({ 
  zIndex = 0, 
  layoutName, 
  children,
  scrollMap=null
}) => {
  // Subheadr scroll
  const [headerStyle, setHeaderStyle] = useContext(SubheaderStyleContext);
  // Get scroll height
  const viewportSize = useWindowSize();

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.65);

  /* UPDATE SLIDE POSITION AT TOP LEVEL OF PAGE */
  const handleChangeSlide = useContext(SlideContext);
  useEffect(() => {
    if (isInView) {
      handleChangeSlide(layoutName);
    }
  }, [isInView]);

  /* TRACK SCROLL POSITION OF PAGE */
  const scrollTargetRef = useRef(null);
  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  /* SCROLL HEIGHT OF PAGE */
  const scrollHeight = calculateScrollHeight(viewportSize.height, 2);

  /* ANIMATION START POSITION */
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

  /* ANIMATIONS */
  /* CONTENT ANIMATIONS */

  /* WHOLE PAGE TRANSLATOIN */
  const [input, transform] = useScrollTransform(
    scrollHeight,
    viewportSize,
    yPosition,
    !scrollMap ? scrollTransformValues.demoTemplate : scrollMap
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

  

  return (
    <>
      <motion.div
        style={{
          height: scrollHeight,
          position: "relative",
          top: 0,
          overflow: "auto",
          backgroundColor: "transparent",
          zIndex: isInView ? zIndex : -1,
        }}
        ref={scrollTargetRef}
      >
        <motion.div
          style={{
            y: springyTransformShowcaseAnimationThree,
            top: 0,
            position: "fixed",
            height: "100vh",
            width: "100vw",
          }}
          ref={inViewRef}
        >
          {/* Main CONTENT GOES HERE */}
          <motion.div
            className={styles.video_player_container}
          >
            {children}
          
          </motion.div>
          {/*  WRITTEN CONTENT GOES HERE */}
          <div className={styles.written_content_container}>
            <div className={styles.written_content_header_container}>
              <CallOut
                calloutStyleType={1}
                heading="Lorem ipsum dolor sit amet"
                overrideHeaderStyle={styles.heading}
                overrideStyles={styles.header_container}
              />
            </div>

            <div className={styles.written_content_text_container}>
              <p className={styles.written_content}>
                Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis
                sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis
                tristique amet. Elementum laoreet aenean quam phasellus
                imperdiet.
              </p>
              <Button text="See More About It" buttonType={3} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MiscDemoTemplate;