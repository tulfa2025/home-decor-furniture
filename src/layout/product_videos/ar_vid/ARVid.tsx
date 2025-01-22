"use client";
import { useRef, useState, useEffect, useContext } from "react";
import { useScroll, useTransform, useSpring, motion } from "motion/react";
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
import Button from "@/components/button/Button";

const ARVid = ({ zIndex = 0, layoutName }) => {
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
      viewportSize.width >= 768 ? yPosition - scrollHeight * 0.5 : yPosition - scrollHeight * 0.5,
      viewportSize.width >= 768 ? yPosition + scrollHeight * 0.1 : yPosition - scrollHeight * 0.17 ,
      yPosition + scrollHeight * 0.65,
      yPosition + scrollHeight * 0.7,
      viewportSize.width >= 768 ?  yPosition + scrollHeight * 0.85 : yPosition + scrollHeight,
      viewportSize.width >= 768 ? yPosition + scrollHeight : yPosition + scrollHeight * 1.2,
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
            height: viewportSize.width >= 768 ? "100vh" : '160vh',
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
              <div className={styles.ar_graphic_container}></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ARVid;
