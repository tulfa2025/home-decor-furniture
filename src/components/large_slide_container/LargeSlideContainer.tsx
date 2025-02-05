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
import { scrollSpringProperties } from "@/utils/scrollTransformValues";

import SubheaderStyleContext from "@/context/subHeaderStyle";
/* CUSTOM COMPONENTS */
import TitleBanner from "../title_banner/title_banner";

/* CONTEXT */
import SlideContext from "@/context/changeSlide";
import scrollTransformValues from "@/utils/scrollTransformValues";
import useScrollTransform from "@/hooks/use_scrolltransform";
import DeviceContext from "@/context/deviceContext";

const LargeSlideContainer: React.FC<LayoutProps> = ({
  layoutName,
  title,
  children,
  paragraph,
  zIndex = 0,
  dynamicHeader = false,
  bannerType = "default",
  scrollMap = null,
  backgroundStyles = {},
  resize = true,
}) => {
  // Subheader scroll
  const [headerStyle, setHeaderStyle] = useContext(SubheaderStyleContext);
  // Get scroll height
  const viewportSize = useWindowSize();

  const deviceContext = useContext(DeviceContext);

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

  const scrollTargetRef = useRef(null);
  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  const handleChangeSlide = useContext(SlideContext);
  useEffect(() => {
    if (isInView) {
      handleChangeSlide(layoutName);
    }
  }, [isInView]);

  const scrollHeight = calculateScrollHeight(viewportSize.height, 2);

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

  /* ANIMATIONS */
  /* CONTENT ANIMATIONS */
  const transformScaleAnimationOne = useTransform(
    scrollY,
    [0, yPosition, yPosition + scrollHeight * 0.1],
    [
      resize && deviceContext === "Other" ? 1.2 : 1,
      resize && deviceContext === "Other" ? 1.2 : 1,
      1,
    ]
  );
  const springyTransformScaleAnimationOne = useSpring(
    transformScaleAnimationOne,
    {
      damping: 40,
    }
  );

  /* WHOLE PAGE TRANSLATOIN */
  const [input, transform] = useScrollTransform(
    scrollHeight,
    viewportSize,
    yPosition,
    !scrollMap ? scrollTransformValues.lscDefault : scrollMap
  );
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    input,
    transform
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    scrollSpringProperties
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
        zIndex: isInView ? zIndex : -1,
      }}
      ref={scrollTargetRef}
    >
      <motion.div
        style={{
          y: springyTransformShowcaseAnimationThree,
          ...backgroundStyles,
        }}
        className={styles.large_slide_container}
        ref={inViewRef}
      >
        <motion.div className={styles.large_slide_callout_container}>
          <TitleBanner
            title={title}
            paragraph={paragraph}
            bannerType={bannerType}
          />
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
              position: "relative",
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
