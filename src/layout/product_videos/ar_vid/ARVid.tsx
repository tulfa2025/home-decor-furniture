"use client";
import { useRef, useState, useEffect, useContext } from "react";
import { useScroll, useTransform, useSpring, motion, useMotionValueEvent } from "motion/react";
import styles from "./ArVid.module.scss";
/* CUSTOM COMPONENTS */

/* CUSTOM HOOKS */
import useWindowSize from "@/hooks/use_window_size";
import useInView from "@/hooks/use_inview";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
/* CONTEXT */
import SlideContext from "@/context/changeSlide";
import SubheaderStyleContext from "@/context/subHeaderStyle";
import CallOut from "@/components/call_out/CallOut";
import VideoPlayer from "@/components/video/VideoPlayer";
import DeviceContext from "@/context/deviceContext";

const ARVid = ({ zIndex = 0, layoutName }) => {

  // Device context
  const deviceContext = useContext(DeviceContext)
  // Subheadr scroll
  const [headerStyle, setHeaderStyle] = useContext(SubheaderStyleContext);
  // Get scroll height
  const viewportSize = useWindowSize();

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.5);

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
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    [
      0,
      viewportSize.width >= 960 ? yPosition - scrollHeight * 0.4 : yPosition - scrollHeight * 0.55,
      viewportSize.width >= 960 ? yPosition: yPosition - scrollHeight * 0.05 ,
      yPosition + scrollHeight * 0.65,
      yPosition + scrollHeight * 0.7,
      viewportSize.width >= 960 ?  yPosition + scrollHeight * 0.85 : yPosition + scrollHeight,
      viewportSize.width >= 960 ? yPosition + scrollHeight : yPosition + scrollHeight * 1.2,
    ],
    [
      viewportSize.height * 2,
      viewportSize.height * 2,
      0,
      0,
      -viewportSize.height * 0.5,
      -viewportSize.height * 0.5,
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
      if (isInView) {
        if (v > yPosition) {
          setHeaderStyle(0);
        }
      }
    });

    let videoPath, videoType = '';

    switch(deviceContext){
      case 'iOS':
        videoPath = 'ipad_transparent_2.mov'
        videoType = 'video/quicktime'
        break
      default:
        videoPath = 'ipad_transparent_1.webm'
        videoType = 'video/webm'
        break
    }

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
            height: '100vh',
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={inViewRef}
        >
          {/* AR COntainer goes here */}
          <div className={styles.ar_container}>
            <div className={styles.ar_container_inner}>
              {/* WRITTEN CONTENT */}
              <div className={styles.ar_written_container}>
                <CallOut
                  calloutStyleType={1}
                  heading="Lorem ipsum dolor sit amet"
                  overrideHeaderStyle={styles.heading}
                  overrideStyles={styles.heading_container}
                />
                <p
                    className={styles.written_content}
                >
                 Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis tristique amet. Elementum laoreet aenean quam phasellus imperdiet. Bibendum faucibus id elementum risus. Pretium nunc accumsan fringilla nibh vitae feugiat mattis nunc viverra. Lorem fringilla turpis risus mauris faucibus.
                 Integer senectus congue nullam est. Dictum.
                </p>
              </div>

              {/* GRAPHICAL CONTENT */}
              <div className={styles.ar_graphic_container}>

                {/* MOV FILES ARE SUPPORTED ON APPLE BROWSERS */}
                {/*  USE WEBM FOR OTHER DEVICE TYPES */}
                <VideoPlayer
                  src={`videos/product/${videoPath}`}  
                  type={videoType}
                  altText=''
                  onVideoComplete={()=>{}}
                  loop={true}
                  autoplay={false}
                  isInView={isInView}
                  poster='videos/product/ipad-natural.png'
                  styleOverride={{
                    overflow: 'visible',
                    height: '160%',
                    width: '160%'
                  }}
                  videoStyleOverride={{
                    objectFit: 'contain',
                    minWidth: 500
                  }}
                >

                </VideoPlayer>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ARVid;
