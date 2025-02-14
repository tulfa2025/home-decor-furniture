"use client";
import styles from "./sofa_code.module.scss";
import Image from "next/image";
import { useRef, useState, useEffect, useContext, useMemo } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
/* CUSTOM CONTEXT */
import useWindowSize from "@/hooks/use_window_size";
import useInView from "@/hooks/use_inview";
import SlideContext from "@/context/changeSlide";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import SubheaderStyleContext from "@/context/subHeaderStyle";

import useScrollTransform from "@/hooks/use_scrolltransform";
import scrollTransformValues, {
  scrollSpringProperties,
} from "@/utils/scrollTransformValues";

import ThreeDSofa from "../3d_sofa/ThreeDSofa";
import ARIcon from "@/assets/icons/arIcon";
import TulfaCloseButton from "@/assets/icons/tulfa_close_button";
import Button from "@/components/button/Button";

const SofaCode: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
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

  // Subheadr scroll
  const [headerStyle, setHeaderStyle] = useContext(SubheaderStyleContext);
  /* SET HEADER STYLE AT DIFFERNT INTERVALS */
  useMotionValueEvent(scrollY, "change", (v) => {
    if (isInView) {
      if (v > yPosition) {
        setHeaderStyle(0);
      }
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const timeoutRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isInView) {
      clearTimeout(timeoutRef.current);
    } else {
      clearTimeout(timeoutRef.current);

      // Clear 3d model when 3d model out of scene for performance
      if (isActive) {
        timeoutRef.current = setTimeout(() => {
          setIsActive(false);
        }, 1250);
      }
    }
  }, [isInView]);

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
        <AnimatePresence initial={true}>
          {/* CONTENT AQUI */}
          {isInView && (
            <motion.section
              className={styles.container}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  delay: 1,
                  duration: 0.5,
                },
              }}
            >
              <ThreeDSofa />
              <div className={styles.arButton}>
                <ARIcon
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                />
              </div>
              {isModalOpen && (
                <div className={styles.modalPopUp}>
                  <h3 className={styles.headerContainer}>Augmented Reality</h3>
                  <Image
                    src="/glb/qr/recliner.png"
                    alt=""
                    width={173}
                    height={173}
                  />
                  <span className={styles.text}>
                    Point your camera at the QR code.
                  </span>
                  <Button buttonType={5} text="See in your computer" />
                  <TulfaCloseButton
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                    height={42}
                    width={42}
                    fill="rgba(102, 102, 102, 0.60)"
                  />
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SofaCode;
