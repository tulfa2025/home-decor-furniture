"use client";

import { useState, useEffect, useRef, useContext } from "react";
import useWindowSize from "@/hooks/use_window_size";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import VariationImageContainer from "../image_container/variation_image_container/VariationImageContainer";
import styles from "./ProductVariations.module.scss";

/*CUSTOM HOOKS */
import useInView from "@/hooks/use_inview";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import { scrollSpringProperties } from "@/utils/scrollTransformValues";

/* CUSTOM COMPONENTS */
import TitleBanner from "../title_banner/title_banner";
import SubheaderStyleContext from "@/context/subHeaderStyle";

/* CONTEXT */
import SlideContext from "@/context/changeSlide";
import useScrollTransform from "@/hooks/use_scrolltransform";
import scrollTransformValues from "@/utils/scrollTransformValues";
import DeviceContext from "@/context/deviceContext";

const ProductVariation = ({
  imageSet,
  title,
  layoutName,
  paragraph,
  zIndex = 0,
  dynamicHeader = false,
  scrollMap = null,
}) => {
  // Get scroll height
  const viewportSize = useWindowSize();

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

  const scrollHeight = calculateScrollHeight(
    viewportSize.height,
    viewportSize.width > 960 ? 3 : 2
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

  /* BACKGROUND ANIMATIONS */
  const transformScaleAnimationOne = useTransform(
    scrollY,
    [0, yPosition, yPosition + scrollHeight * 0.3],
    [1, 1, 1]
  );
  const springyTransformScaleAnimationOne = useSpring(
    transformScaleAnimationOne,
    {
      damping: 40,
    }
  );

  /* POPP ANIMATION */
  const transformPopupAnimationOne = useTransform(
    scrollY,
    [
      0,
      viewportSize.width > 960
        ? yPosition + scrollHeight * 0.1
        : yPosition + scrollHeight * 0.1,
      viewportSize.width > 960
        ? yPosition + scrollHeight * 0.15
        : yPosition + scrollHeight * 0.2,
      viewportSize.width > 960
        ? yPosition + scrollHeight * 0.3
        : yPosition + scrollHeight * 0.5,
    ],
    [
      viewportSize.width > 960 ? viewportSize.height * 1.2 : scrollHeight * 0.6,
      viewportSize.width > 960 ? viewportSize.height * 1.2 : scrollHeight * 0.6,
      viewportSize.width > 960
        ? viewportSize.height * 1.2
        : scrollHeight * 0.35,
      viewportSize.width > 960
        ? -viewportSize.height * 0.1
        : -viewportSize.height * 0.1,
    ]
  );

  const springyTransformPopupAnimationOne = useSpring(
    transformPopupAnimationOne,
    {
      damping: 40,
      stiffness: viewportSize.width > 960 ? 150 : 400,
      mass: 0.2, // Lighter = quicker stop
      velocity: 0, // No initial speed
      restDelta: 0.01, // Stops when close to the target
    }
  );

  /* WHOLE PAGE TRANSLATOIN */
  const [input, transform] = useScrollTransform(
    scrollHeight,
    viewportSize,
    yPosition,
    !scrollMap ? scrollTransformValues.varDefault : scrollMap
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

  const [headerStyle, setHeaderStyle] = useContext(SubheaderStyleContext);

  /* SET HEADER STYLE AT DIFFERNT INTERVALS */
  useMotionValueEvent(scrollY, "change", (v) => {
    if (!isInView) return;

    if (!dynamicHeader) {
      setHeaderStyle(0);
    } else if (v > yPosition + viewportSize.height + scrollHeight * 0.3) {
      setHeaderStyle(2);
    } else {
      setHeaderStyle(0);
    }
  });

  const deviceContext = useContext(DeviceContext);

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      console.log('Triggered render')
      setIsRendered(true);
    }, 3000);
  }, []);

  return (
    <>
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
            height: viewportSize.width > 768 ? "140vh" : "130vh",
            width: "100vw",
            y: springyTransformShowcaseAnimationThree,
          }}
          ref={inViewRef}
        >
          {isRendered ? (
            <motion.section className={styles.product_container}>
              {/* CALLOUT BANNER CONTAINER */}
              <div className={styles.title_banner_container}>
                <TitleBanner
                  title={title}
                  paragraph={paragraph}
                  bannerType="default"
                />
              </div>

              {/* BACKGROUND IMAGE */}
              <motion.div
                style={{
                  scale: springyTransformScaleAnimationOne,
                }}
                className={styles.background_image_container}
              >
                <Image
                  src={imageSet.background}
                  alt=""
                  priority
                  className={imageSet.backgroundStyling}
                  quality={deviceContext === "Other" ? 50 : 1}
                />
              </motion.div>

              {/* VARIATION CONTAINER */}
              <motion.div
                className={styles.product_variation_content_container}
                style={{
                  y: springyTransformPopupAnimationOne,
                }}
              >
                {/* IMAGE CONTAINER */}
                <div className={styles.images_container}>
                  {imageSet["top"].map((imageSource, index) => {
                    return (
                      <motion.div
                        key={index}
                        className={styles.indiv_image_container}
                        style={{
                          opacity: viewportSize.height > 768 ? 0 : 1,
                          y: viewportSize.height > 768 ? 100 : 0,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: (index + 1) * 0.2,
                          duration: 0.5,
                        }}
                      >
                        <VariationImageContainer
                          imageSrc={imageSource}
                          imageStyles={imageSet.imageStyles}
                          imageClassName={styles.indiv_image_var}
                          blur={true}
                          quality={1}
                        />

                        <p className={styles.image_text}>{imageSource[2]}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.section>
          ) : (
            <></>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProductVariation;
