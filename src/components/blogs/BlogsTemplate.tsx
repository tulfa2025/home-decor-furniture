"use client";
import Card from "@/components/card/Card";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";
/* BLOG IMAGES*/
import { useRef, useEffect, useState, useContext } from "react";
import { blogData } from "@/utils/constants";

import useInView from "@/hooks/use_inview";
import useWindowSize from "@/hooks/use_window_size";
import calculateScrollHeight from "@/utils/calculate_scrollheight";

import styles from "./Blogs.module.scss";

import SlideContext from "@/context/changeSlide";
import useScrollTransform from "@/hooks/use_scrolltransform";
import scrollTransformValues from "@/utils/scrollTransformValues";
import { scrollSpringProperties } from "@/utils/scrollTransformValues";
import DeviceContext from "@/context/deviceContext";

const BlogsTemplate: React.FC<LayoutProps> = ({
  layoutName,
  zIndex,
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

  /* WHOLE PAGE TRANSLATOIN */
  const [input, transform] = useScrollTransform(
    scrollHeight,
    viewportSize,
    yPosition,
    !scrollMap ? scrollTransformValues.blogsDefault : scrollMap
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
        <motion.section className={styles.blogs_container}>
          <div className={styles.blogs_content}>
            <h4 className={styles.blogs_content_heading}>Latest Blogs</h4>
            <div className={styles.blogs_content_cards}>
              {blogData.map((blogData, index) => {
                return (
                  <motion.div
                    key={index}
                    className={styles.blog_card_container}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: (index + 1) * 0.2,
                        duration: 0.5,
                      },
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        delay: 0,
                        duration: 0.2,
                      },
                    }}
                  >
                    <Card
                      heading={blogData.heading}
                      paragraph={blogData.paragraph}
                      imageData={blogData.imageData}
                      date={blogData.date}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};
export default BlogsTemplate;
