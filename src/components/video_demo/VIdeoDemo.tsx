"use client";
import { useRef, useState, useEffect, useContext } from "react";
import { useScroll, useTransform, useSpring, motion } from "motion/react";
import styles from './VideoDemo.module.scss'
/* CUSTOM COMPONENTS */
import VideoPlayer from "../video/VideoPlayer";
/* CUSTOM HOOKS */
import useWindowSize from "@/hooks/use_window_size";
import useInView from "@/hooks/use_inview";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
/* CONTEXT */
import SlideContext from "@/context/changeSlide";
import SubheaderStyleContext from "@/context/subHeaderStyle";

const VideoDemo = ({ zIndex = 0, layoutName }) => {
  // Subheadr scroll
  const [headerStyle, setHeaderStyle] = useContext(SubheaderStyleContext);
  // Get scroll height
  const viewportSize = useWindowSize();

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

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
  const scrollHeight = calculateScrollHeight(viewportSize.height, 1);

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
  const transformShowcaseAnimationThree = useTransform(scrollY, [0], [0]);

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    {
      damping: 35,
      stiffness: 125,
    }
  );

  return (
    <>
      <motion.div
        style={{
          height: scrollHeight,
          position: "relative",
          top: 0,
          overflow: "auto",
        //   backgroundColor: "transparent",
          background: "linear-gradient(180deg, #ff7e5f, #feb47b)",
          zIndex: isInView ? zIndex : -1,
        }}
        ref={scrollTargetRef}
      >
        <motion.div
          style={{
            y: springyTransformShowcaseAnimationThree,
          }}
          ref={inViewRef}
        >
            {/* CONTENT GOES HERE */}

        </motion.div>
      </motion.div>
    </>
  );
};

export default VideoDemo;
