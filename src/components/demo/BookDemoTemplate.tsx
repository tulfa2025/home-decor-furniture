"use client";

import Button from "@/components/button/Button";
import Image from "next/image";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState, useContext, useMemo } from "react";
import useInView from "@/hooks/use_inview";
import useWindowSize from "@/hooks/use_window_size";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import SlideContext from "@/context/changeSlide";
import styles from "./BookDemo.module.scss";

import useScrollTransform from "@/hooks/use_scrolltransform";
import scrollTransformValues from "@/utils/scrollTransformValues";
import { scrollSpringProperties } from "@/utils/scrollTransformValues";
import DeviceContext from "@/context/deviceContext";

const BookDemoTemplate = ({ layoutName, zIndex, scrollMap = null }) => {
  // Get scroll height
  const viewportSize = useWindowSize();

  // DETERMINE BACKGROUND IMAGE BASED ON VIEWPORT SIZE
  const backgroundImage = useMemo(() => {
    if (viewportSize.width >= 768) {
      return "/images/book_demo/book.webp";
    } else {
      return "/images/book_demo/book_mobile.webp";
    }
  }, [viewportSize]);

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.01);

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

  const scrollHeight = calculateScrollHeight(
    viewportSize.height,
    viewportSize.width >= 960 ? 2 : 1
  );

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

  /* WHOLE PAGE TRANSLATOIN */
  const [input, transform] = useScrollTransform(
    scrollHeight,
    viewportSize,
    yPosition,
    !scrollMap ? scrollTransformValues.bookDemoDefault : scrollMap
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

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTargetRef.current) {
        scrollTargetRef.current = null;
      }

      if (inViewRef.current) {
        inViewRef.current = null;
      }
    };
  }, []);

  const deviceContext = useContext(DeviceContext);
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
        {isInView && (
          <motion.section
            className={styles.book_container}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.25,
            }}
          >
            <div className={styles.book_content}>
              <Image
                alt=""
                src={backgroundImage}
                className={styles.book_demo_image}
                quality={deviceContext === "Other" ? 50 : 10}
                height={2400}
                width={3000}
              />
              <div className={styles.book_inner_container}>
                <h4 className={styles.book_content_heading}>Book a Demo</h4>
                <p className={styles.book_content_paragraph}>
                  We have produced product visuals and immersive experiences for
                  fortune 500 companies. Are you spending more than $50k on your
                  product content? Talk to us.
                </p>
                <Button
                  text="Schedule a Demo"
                  modifier="l-color"
                  buttonType={4}
                  externalLink="https://www.tulfa.com/contact-us"
                />
              </div>
            </div>
          </motion.section>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BookDemoTemplate;
