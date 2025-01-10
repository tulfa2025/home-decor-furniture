"use client";
import styles from "./Banner.module.scss";
import { motion, useSpring, useTransform, useScroll, useMotionValueEvent } from "framer-motion";
import VideoPlayer from "@/components/video/VideoPlayer";
// import CtaPrimary from "@/layout/cta_primary/CtaPrimary";
import { useRef, useEffect, useState, useContext } from "react";
import useInView from "../../hooks/use_inview";
import useWindowSize from "@/hooks/use_window_size";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import SubheaderStyleContext from "@/context/subHeaderStyle";

const Banner: React.FC<LayoutProps> = ({ layoutName, handleChangeSlide, zIndex }) => {
  // Get scroll height
  const viewportSize = useWindowSize();

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

  const scrollTargetRef = useRef(null);
  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  const scrollHeight = calculateScrollHeight(viewportSize.height, 2);

  /* ANIMATION START AND END POSITION */
  const [yPosition, setYPosition] = useState(null);

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

  /* WHOLE PAGE TRANSLATOIN */
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    [
      0,
      yPosition + scrollHeight * 0.2,
      yPosition + scrollHeight,
    ],
    [
      0,
      0,
      -viewportSize.height * 2.4,
    ]
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    {
      damping: 40,
      stiffness: 150
    }
  );

  const setHeaderStyle = useContext(SubheaderStyleContext)

  /* SET HEADER STYLE AT DIFFERNT INTERVALS */
  useMotionValueEvent(scrollY, 'change', (v)=>{
    if(isInView){
      if(v > 0){
        setHeaderStyle(2)
      }
    }
  })

  useEffect(()=>{
    setHeaderStyle(2)
  },[])

  // Trigger move to next slide programmatically??
  return (
    <motion.div
      style={{
        height: scrollHeight,
        position: "relative",
        top: 0,
        overflow: "auto",
        zIndex: zIndex
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
          <VideoPlayer
            src="/videos/sofa_video.mp4"
            type="video/mp4"
            altText=""
            loop={false}
            autoplay={false}
            isInView={isInView}
            onVideoComplete={() => {}}
          />
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
