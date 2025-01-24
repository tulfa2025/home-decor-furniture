"use client";
import styles from "./Banner.module.scss";
import {
  motion,
  useSpring,
  useTransform,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import VideoPlayer from "@/components/video/VideoPlayer";
import { useRef, useEffect, useState, useContext } from "react";
import useInView from "../../../hooks/use_inview";
import useWindowSize from "@/hooks/use_window_size";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import SubheaderStyleContext from "@/context/subHeaderStyle";

import DeviceContext from "@/context/deviceContext";

import useScrollTransform from "@/hooks/use_scrolltransform";
import scrollTransformValues from "@/utils/scrollTransformValues";

const Banner: React.FC<LayoutProps> = ({ zIndex }) => {
  // Get scroll height
  const viewportSize = useWindowSize();

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

  const scrollTargetRef = useRef(null);
  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  const scrollHeight = calculateScrollHeight(viewportSize.height, 1);

  /* ANIMATION START AND END POSITION */
  const [yPosition, setYPosition] = useState(0);

  // Function to get the Y position of the element
  const getElementYPosition = () => {
    if (inViewRef.current) {
      const yPos = inViewRef.current.offsetTop;
      setYPosition(yPos); // Update state with the Y position
    }
  };

  // Optionally, you can track the position on window resize or scroll
  useEffect(() => {
    // Get initial Y position when component mounts
    getElementYPosition();
  }, [scrollHeight]);

  /* WHOLE PAGE TRANSLATION */

  const [input, transform] = useScrollTransform(
    scrollHeight,
    viewportSize,
    yPosition,
    scrollTransformValues.banner
  )

  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    input,
    transform
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    {
      damping: 40,
      stiffness: 150,
    }
  );

  const [headerStyle, setHeaderStyle] = useContext(SubheaderStyleContext);

  /* SET HEADER STYLE AT DIFFERNT INTERVALS */
  useMotionValueEvent(scrollY, "change", (v) => {
    if (isInView) {
      if (headerStyle !== 2) setHeaderStyle(2);
    }
  });

  useEffect(() => {
    if (!isInView) return;
    if (headerStyle !== 2) setHeaderStyle(2);
  }, [isInView]);

  const deviceOS = useContext(DeviceContext);


  /* HIDE MENU BUTTON */
  useEffect(()=>{

    if(isInView){
      const menu  = document.getElementById('menu')

      menu.style.visibility = 'hidden'
    } else {
      const menu  = document.getElementById('menu');
      menu.style.visibility = 'unset'
    }
  }, [isInView])

  // Trigger move to next slide programmatically??
  return (
    <motion.div
      style={{
        height: scrollHeight,
        position: "relative",
        top: 0,
        overflow: "auto",
        zIndex: zIndex,
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
        <motion.section className={styles.banner_container} ref={inViewRef}>
          {deviceOS ? (
            <VideoPlayer
              src={
                deviceOS === "Other"
                  ? "videos/banner/sofa_video_compressed.mp4"
                  : "videos/product/Mobile/Sofa_veritical view_compressed.mp4"
              }
              poster={
                deviceOS === "Other"
                  ? "videos/banner/sofa_video_compressed-desktop.jpg"
                  : "videos/product/Mobile/Sofa_veritical view_compressed-mobile.jpg"
              }
              type="video/mp4"
              altText=""
              loop={true}
              autoplay={true}
              isInView={isInView}
              onVideoComplete={() => {}}
            />
          ) : (
            <></>
          )}
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
