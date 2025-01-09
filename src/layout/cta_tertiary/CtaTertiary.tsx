"use client";
import styles from "./CtaTertiary.module.scss";
import Image from "next/image";
import sofaImage from "../../assets/images/cta_tertiary/Green_sofa.png";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/use_window_size";

/* CUSTOM HOOKS */
import useInView from "@/hooks/use_inview";

/* CUSTOM UTILS */
import calculateScrollHeight from "@/utils/calculate_scrollheight";

const CtaTertiary: React.FC<LayoutProps> = ({
  layoutName,
  handleChangeSlide,
  zIndex
}) => {
  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

  useEffect(() => {
    if (isInView) {
      handleChangeSlide(layoutName);
    }
  }, [isInView]);

  // Get scroll height
  const viewportSize = useWindowSize();
  const scrollHeight = calculateScrollHeight(viewportSize.height, (viewportSize.width > 960 ? 10 : 10))

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

  // Ensure the ref is available before applying useScroll
  const scrollTargetRef = useRef(null);

  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  /**
   * For each SPAN element, check whether its in the viewport
   */
  useEffect(() => {
    // Select all the text groups
    const textGroups = document.querySelectorAll(".text-group");

    // Create an intersection observer
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // When a text group enters the viewport, add 'highlight' class
          if (entry.isIntersecting) {
            entry.target.classList.add(
              `${styles.cta_content_paragraph_activated}`
            );
          } else {
            entry.target.classList.remove(
              `${styles.cta_content_paragraph_activated}`
            );
          }
        });
      },
      {
        threshold: 1,
      }
    );

    // Observe each text group
    textGroups.forEach((group) => {
      observer.observe(group);
    });

    return;
  });

  /* SCROLLBASED ANIMATIONS */

  //CTA CONTENT
  const translateAnimationOne = useTransform(
    scrollY,
    [
      yPosition, 
      yPosition + scrollHeight * 0.65
    ],
    [viewportSize.height * 3, -viewportSize.height * 3]
  );
  const springyTranslateAnimationOne = useSpring(translateAnimationOne, {
    damping: 35,
    stiffness: 300
  });

  // CHAIR
  const translateAnimationTwo = useTransform(
    scrollY,
    [
      0, 
      yPosition,
      yPosition + scrollHeight * 0.1,
      yPosition + scrollHeight * 0.7,
      yPosition + scrollHeight * 1.0
    ],
    [
      -viewportSize.height / 2,
      -viewportSize.height / 2,
      viewportSize.height / 3,
      viewportSize.height / 3,
      -viewportSize.height / 2,
    ]
  );

  const springyTranslateAnimationTwo = useSpring(translateAnimationTwo, {
    damping: 40,
    stiffness: 100
  });

  /* PAGE TRANSFORM */
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    [
      0,
      yPosition,
      yPosition + viewportSize.height * 0.5,
      yPosition + viewportSize.height + (scrollHeight * 0.5),
      yPosition + viewportSize.height + (scrollHeight),
    ],
    [
      viewportSize.height * 2.4,
      viewportSize.height * 2.4,
      0,
      0,
      -viewportSize.height * 4.8,
    ]
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    {
      damping: 40,
      stiffness: 80
    }
  );

  return (
    <motion.div
      animate={{
        opacity: true ? 1 : 0,
        duration: 1,
      }}
      style={{
        height: scrollHeight,
        position: "relative",
        zIndex: isInView ? zIndex : -1
      }}
      ref={scrollTargetRef}
    >
      <motion.div
        style={{
          position: "fixed",
          height: "100vh",
          width: "100%",
          top: 0,
          y: springyTransformShowcaseAnimationThree,
        }}
      >
        <motion.section className={styles.cta_container}>
          <motion.div
            className={styles.cta_content}
            style={{
              y: springyTranslateAnimationOne,
            }}
          >
            <p className={styles.cta_content_paragraph}>
              <span className={`${styles.text_group} text-group`}>Lorem ipsum dolor sit amet. </span>
              <span className={`${styles.text_group} text-group`}>
                Quo odit atque ut architecto obcaecati rem{" "}
              </span>
              <span className={`${styles.text_group} text-group`}>
                vitae tempore non asperiores consequatur ut!{" "}
              </span>
            </p>
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              y: springyTranslateAnimationTwo,
              backgroundColor: "transparent",
            }}
            className={styles.cta_image_container}
          >
            <Image src={sofaImage} alt="" className={styles.cta_image} />
          </motion.div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default CtaTertiary;
