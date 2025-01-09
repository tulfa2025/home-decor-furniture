"use client";

import { useState, useEffect, useRef } from "react";
import useWindowSize from "@/hooks/use_window_size";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import ImageContainer from "../image_container/ImageContainer";
import styles from "./ProductVariations.module.scss";

/*CUSTOM HOOKS */
import useInView from "@/hooks/use_inview";
import calculateScrollHeight from "@/utils/calculate_scrollheight";

/* CUSTOM COMPONENTS */
import TitleBanner from "../title_banner/title_banner";

const ProductVariation = ({
  imageSet,
  headerImage,
  title,
  handleChangeSlide,
  layoutName,
  handleLayoutLoad,
  paragraph,
  zIndex = 0,
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

  useEffect(() => {
    if (isInView) {
      handleChangeSlide(layoutName);
    }
  }, [isInView]);

  const scrollHeight = calculateScrollHeight(
    viewportSize.height,
    viewportSize.width > 960 ? 5 : 3
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
    [0, yPosition + scrollHeight * 0.4, yPosition + scrollHeight * 0.45],
    [viewportSize.height * 1.2, viewportSize.height * 1.2, 0]
  );

  const springyTransformPopupAnimationOne = useSpring(
    transformPopupAnimationOne,
    {
      damping: 40,
    }
  );

  /* WHOLE PAGE TRANSLATOIN */
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    [
      0,
      yPosition,
      yPosition + viewportSize.height,
      yPosition + viewportSize.height + scrollHeight * 0.2,
      yPosition + viewportSize.height + scrollHeight * 0.25,
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
      -viewportSize.height * 0.4,
      -viewportSize.height * 0.4,
      -viewportSize.height * 4.8,
    ]
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    {
      damping: viewportSize.width > 768
      ? 40
      : 120,
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
          zIndex: isInView ? zIndex : -1,
        }}
        ref={scrollTargetRef}
      >
        <motion.div
          style={{
            top: 0,
            position: "fixed",
            height: "140vh",
            width: "100vw",
            y: springyTransformShowcaseAnimationThree,
          }}
          ref={inViewRef}
        >
          <motion.section className={styles.product_container}>
            {/* CALLOUT BANNER CONTAINER */}
            <div className={styles.title_banner_container}>
              <TitleBanner title={title} paragraph={paragraph} />
            </div>

            {/* BACKGROUND IMAGE */}
            <motion.div
              style={{
                scale: springyTransformScaleAnimationOne,
              }}
              className={styles.background_image_container}
            >
              <Image
                src={imageSet["background"]}
                alt=""
                priority
                className={styles.main_image}
                quality={100}
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
                      <ImageContainer
                        imageSrc={imageSource[0]}
                        hoverImageSrc={imageSource[2]}
                        alt={imageSource[1]}
                        priority={false}
                        fullscreenToggle={false}
                        imageStyles={{}}
                        imageClassName={styles.indiv_image_var}
                        blur={true}
                      />

                      <p className={styles.image_text}>{imageSource[1]}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.section>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProductVariation;
