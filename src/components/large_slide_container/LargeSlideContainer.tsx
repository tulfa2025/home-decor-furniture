"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState, useRef, useContext } from "react";
import styles from "./LargeSlideContainer.module.scss";

/* CUSTOM HOOKS */
import useInView from "@/hooks/use_inview";
import useWindowSize from "@/hooks/use_window_size";
import calculateScrollHeight from "@/utils/calculate_scrollheight";

import SubheaderStyleContext from "@/context/subHeaderStyle";
/* CUSTOM COMPONENTS */
import TitleBanner from "../title_banner/title_banner";

const LargeSlideContainer: React.FC<LayoutProps> = ({
  layoutName,
  handleChangeSlide,
  title,
  children,
  paragraph,
  zIndex = 0,
  dynamicHeader = false,
}) => {
  // Subheadr scroll
  const setHeaderStyle = useContext(SubheaderStyleContext);
  // Get scroll height
  const viewportSize = useWindowSize();

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

  const scrollTargetRef = useRef(null);
  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  useEffect(() => {
    if (isInView) {
      handleChangeSlide(layoutName);
    }
  }, [isInView]);

  const scrollHeight = calculateScrollHeight(
    viewportSize.height,
    viewportSize.width > 960 ? 2 : 2
  );

  /* ANIMATION START AND END POSITION */
  const [yPosition, setYPosition] = useState(null);

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
  const transformScaleAnimationOne = useTransform(
    scrollY,
    [0, yPosition, yPosition + scrollHeight * 0.1],
    [1.2, 1.2, 1]
  );
  const springyTransformScaleAnimationOne = useSpring(
    transformScaleAnimationOne,
    {
      damping: 40,
    }
  );

  /* WHOLE PAGE TRANSLATOIN */
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    [
      0,
      viewportSize.width > 768 ? yPosition - viewportSize.height : yPosition - viewportSize.height / 2,
      viewportSize.width > 768 ? yPosition + viewportSize.height : yPosition,
      yPosition + viewportSize.height + scrollHeight * 0.1,
      yPosition + viewportSize.height + scrollHeight * 0.55,
      viewportSize.width > 768
        ? yPosition + viewportSize.height + scrollHeight * 0.85
        : yPosition + viewportSize.height + scrollHeight * 0.55,
      yPosition + viewportSize.height + scrollHeight,
    ],
    [
      viewportSize.height * 2.4,
      viewportSize.height * 2.4,
      0,
      0,
      viewportSize.width > 768
        ? -viewportSize.height * 0.4 - 60
        : -viewportSize.height * 0.2 - 60,
      viewportSize.width > 768
        ? -viewportSize.height * 0.4 - 60
        : -viewportSize.height * 0.2 - 60,
      -viewportSize.height * 2.4,
    ]
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    {
      damping: 35,
      stiffness: 125,
    }
  );

  /* SET HEADER STYLE AT DIFFERNT INTERVALS */
  useMotionValueEvent(scrollY, "change", (v) => {
    if (!isInView) return;

    if (!dynamicHeader) {
      setHeaderStyle(0);
    } else if (v > yPosition + viewportSize.height + scrollHeight * 0.4) {
      setHeaderStyle(2);
    } else {
      setHeaderStyle(0);
    }
  });

  return (
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
        }}
        className={styles.large_slide_container}
        ref={inViewRef}
      >
        <motion.div className={styles.large_slide_callout_container}>
          <TitleBanner title={title} paragraph={paragraph} />
        </motion.div>
        <motion.section
          className={styles.large_slide_content_container}
          style={{
            scale: springyTransformScaleAnimationOne,
          }}
        >
          <motion.div
            style={{
              height: "100%",
              width: "100%",
              position: 'relative',
              
            }}
          >
            {children}
          </motion.div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default LargeSlideContainer;
