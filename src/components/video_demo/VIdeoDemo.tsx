"use client";
import { useRef, useState, useEffect, useContext } from "react";
import { useScroll, useTransform, useSpring, motion } from "motion/react";
import styles from "./VideoDemo.module.scss";
/* CUSTOM COMPONENTS */
import VideoPlayer from "../video/VideoPlayer";
/* CUSTOM HOOKS */
import useWindowSize from "@/hooks/use_window_size";
import useInView from "@/hooks/use_inview";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
/* CONTEXT */
import SlideContext from "@/context/changeSlide";
import SubheaderStyleContext from "@/context/subHeaderStyle";
import CallOut from "../call_out/CallOut";

const VideoDemo = ({ zIndex = 0, layoutName, videoSourceRef }) => {
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
  const scrollHeight = calculateScrollHeight(viewportSize.height, 2.5);

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
  const videoContainerScale = useTransform(
    scrollY,
    [0, yPosition + scrollHeight * 0.3, yPosition + scrollHeight * 0.4],
    [1.05, 1.05, 0.9]
  );

  const springyVideoContainerScale = useSpring(videoContainerScale, {
    damping: 35,
    stiffness: 125,
  });

  /* WHOLE PAGE TRANSLATOIN */
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    [
      0,
      yPosition - viewportSize.height * 1.5,
      yPosition,
      yPosition + scrollHeight * 0.5,
      yPosition + scrollHeight * 0.65,
      yPosition + scrollHeight,
    ],
    [
      viewportSize.height * 1.2,
      viewportSize.height * 1.2,
      0,
      0,
      -viewportSize.height * 1.2,
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

  return (
    <>
      <motion.div
        style={{
          height: scrollHeight,
          position: "relative",
          top: 0,
          overflow: "auto",
          //   backgroundColor: "transparent",
          background: "white",
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
          {/* VIDEO CONTENT GOES HERE */}
          <motion.div
            className={styles.video_player_container}
            style={{
              scale: springyVideoContainerScale,
            }}
          >
            <VideoPlayer
              src={videoSourceRef}
              type="video/mp4"
              altText=""
              onVideoComplete={() => {}}
              loop={false}
              styleOverride={{
                width: "100vw",
              }}
              isInView={isInView}
              autoplay={false}
            />
          </motion.div>
          {/* VIDEO WRITTEN CONTENT GOES HERE */}
          <div className={styles.written_content_container}>
            <div
              className={styles.written_content_header_container}
            >
              <CallOut calloutStyleType={1} heading="Lorem Ipsum" />

            </div>
            

            <div
              className={styles.written_content_text_container}
            >
              Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis
              sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis
              tristique amet. Elementum laoreet aenean quam phasellus imperdiet.
              Bibendum faucibus id elementum risus. Pretium nunc accumsan
              fringilla nibh vitae feugiat mattis nunc viverra. Lorem fringilla
              turpis risus mauris faucibus. Integer senectus congue nullam est.
              Dictum.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default VideoDemo;
